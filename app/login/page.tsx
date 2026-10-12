
import { Suspense } from 'react'
import Link from 'next/link'
import { signIn } from '@/app/actions/auth'

type LoginPageProps = {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

function LoginFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <p className="text-gray-400">Cargando inicio de sesión...</p>
    </main>
  )
}

async function LoginForm({
  searchParams,
}: LoginPageProps) {
  const { error, message } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
        <h1 className="mb-2 text-3xl font-bold">
          Iniciar sesión
        </h1>

        <p className="mb-6 text-gray-400">
          Ingresá a tu cuenta para continuar.
        </p>

        {message === 'check-email' && (
          <p role="status" className="mb-4 rounded-lg bg-green-950 p-3 text-sm text-green-300">
            Revisá tu correo para confirmar tu registro antes de iniciar sesión.
          </p>
        )}

        {message === 'password-updated' && (
          <p role="status" className="mb-4 rounded-lg bg-green-950 p-3 text-sm text-green-300">
            ¡Contraseña actualizada correctamente! Ya podés iniciar sesión con tu nueva contraseña.
          </p>
        )}

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-300">
            {error === 'invalid-input'
              ? 'Ingresá un correo válido y tu contraseña.'
              : 'No se pudo iniciar sesión. Revisá tus credenciales e intentá de nuevo.'}
          </p>
        )}

        <form action={signIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={254}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              maxLength={72}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Tu contraseña"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-500"
          >
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          <Link href="/forgot-password" className="text-blue-400 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>

        <p className="mt-4 text-center text-sm text-gray-400">
          ¿No tenés cuenta?{' '}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Registrate
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function LoginPage(props: LoginPageProps) {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm searchParams={props.searchParams} />
    </Suspense>
  )
}
