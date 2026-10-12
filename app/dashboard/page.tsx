
import { connection } from 'next/server'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'

export const instant = false

export default async function DashboardPage() {
await connection()
  
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()

  const claims = data?.claims ?? null

  if (error || !claims) {
    redirect('/login')
  }

  const email =
    typeof claims.email === 'string' ? claims.email : 'Usuario autenticado'

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">
            Mi Dashboard
          </h1>

          <form action={signOut}>
            <button
              type="submit"
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm transition hover:bg-gray-800"
            >
              Cerrar sesión
            </button>
          </form>
        </header>

        <section className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
          <p className="mb-2 text-sm text-green-400">
            Sesión autenticada
          </p>

          <h2 className="mb-4 text-2xl font-semibold">
            ¡Bienvenido!
          </h2>

          <p className="text-gray-400">
            Iniciaste sesión con la cuenta:
          </p>

          <p className="mt-2 break-all font-medium">
            {email}
          </p>

          <p className="mt-6 text-sm text-gray-500">
            Esta página verifica la sesión en el servidor antes de mostrar
            el contenido privado.
          </p>
        </section>
      </div>
    </main>
  )
}
