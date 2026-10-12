
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signUp(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    password.length < 8 ||
    password.length > 72
  ) {
    redirect('/signup?error=invalid-input')
  }

  const supabase = await createClient()

  
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/confirm?next=/dashboard`,
    },
  })

  if (error) {
    redirect('/signup?error=signup-failed')
  }

  if (data.session) {
    redirect('/dashboard')
  }

  redirect('/confirm-email')
}

export async function signIn(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    password.length === 0 ||
    password.length > 72
  ) {
    redirect('/login?error=invalid-input')
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect('/login?error=invalid-credentials')
  }

  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  redirect('/login')
}

export async function resetPasswordRequest(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim()

  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    redirect('/forgot-password?error=invalid-input')
  }

  const supabase = await createClient()

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/reset-password`,
  })

  if (error) {
    console.error('[resetPasswordRequest]', {
      status: error.status,
      code: error.code,
      message: error.message,
    })

    redirect('/forgot-password?error=request-failed')
  }

  if (error) {
    redirect('/forgot-password?error=request-failed')
  }

  redirect('/forgot-password?message=check-email')
}

export async function updatePassword(formData: FormData) {
  const code = String(formData.get('code') ?? '')
  const password = String(formData.get('password') ?? '')
  const confirmPassword = String(
    formData.get('confirmPassword') ?? ''
  )

  if (!code || password.length < 8 || password.length > 72) {
    redirect('/reset-password?error=invalid-input')
  }

  if (password !== confirmPassword) {
    redirect(
      `/reset-password?error=password-mismatch&code=${encodeURIComponent(code)}`
    )
  }

  const supabase = await createClient()

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code)

  if (exchangeError) {
    redirect('/forgot-password?error=request-failed')
  }

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    redirect('/reset-password?error=update-failed')
  }

  await supabase.auth.signOut()

  redirect('/login?message=password-updated')
}
