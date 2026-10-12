
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  let refreshedCookies: Array<{
    name: string
    value: string
    options?: any
  }> = []

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      },
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          refreshedCookies = cookiesToSet

          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          supabaseResponse = NextResponse.next({ request })

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  
  const { data, error } = await supabase.auth.getClaims()

  const claims = error ? null : data?.claims ?? null


  const pathname = request.nextUrl.pathname

  const isProtectedRoute = pathname.startsWith('/dashboard')
  const isAuthRoute =
    pathname === '/login' || pathname === '/signup'

  if (isProtectedRoute && !claims) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.search = ''

    const response = NextResponse.redirect(url)

    refreshedCookies.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options)
    })

    return response
  }

  if (isAuthRoute && claims) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.search = ''

    const response = NextResponse.redirect(url)

    refreshedCookies.forEach(({ name, value, options }) => {
      response.cookies.set(name, value, options)
    })

    return response
  }

  return supabaseResponse
}
