
import { Suspense } from 'react'
import Link from 'next/link'
import { signUp } from '@/app/actions/auth'

type SignupPageProps = {
  searchParams: Promise<{ error?: string }>
}

function SignupFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <p className="text-gray-400">Cargando registro...</p>
    </main>
  )
}

async function SignupForm({
  searchParams,
}: SignupPageProps) {
  const { error } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
        <h1 className="mb-2 text-3xl font-bold">
          Crear cuenta
        </h1>

        <p className="mb-6 text-gray-400">
          Registrate para acceder a tu espacio personal.
        </p>

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-300"
          >
            {error === 'invalid-input'
              ? 'Ingresá un correo válido y una contraseña de entre 8 y 72 caracteres.'
              : 'No se pudo completar el registro. Revisá los datos e intentá de nuevo.'}
          </p>
        )}

        <form action={signUp} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={72}
              required
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none focus:border-blue-500"
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-500"
          >
            Crear cuenta
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          ¿Ya tenés cuenta?{' '}
          <Link
            href="/login"
            className="text-blue-400 hover:underline"
          >
            Iniciá sesión
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function SignupPage(props: SignupPageProps) {
  return (
    <Suspense fallback={<SignupFallback />}>
      <SignupForm searchParams={props.searchParams} />
    </Suspense>
  )
}
