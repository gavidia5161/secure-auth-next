
import { Suspense } from 'react'
import Link from 'next/link'
import { resetPasswordRequest } from '@/app/actions/auth'

type ForgotPasswordProps = {
  searchParams: Promise<{
    error?: string
    message?: string
  }>
}

function ForgotPasswordFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <p className="text-gray-400">Cargando recuperación de contraseña...</p>
    </main>
  )
}

async function ForgotPasswordForm({
  searchParams,
}: ForgotPasswordProps) {
  const { error, message } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
        <h1 className="mb-2 text-3xl font-bold">
          Recuperar contraseña
        </h1>

        <p className="mb-6 text-gray-400">
          Ingresá tu correo y te enviaremos instrucciones para restablecer tu contraseña.
        </p>

        {message === 'check-email' && (
          <p role="status" className="mb-4 rounded-lg bg-green-950 p-3 text-sm text-green-300">
            Si el correo es válido, recibirás instrucciones para continuar.
            Revisá también la carpeta de spam.
          </p>
        )}

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-300">
            {error === 'invalid-input'
              ? 'Ingresá una dirección de correo válida.'
              : 'No se pudo procesar la solicitud. Intentá de nuevo más tarde.'}
          </p>
        )}

        <form action={resetPasswordRequest} className="space-y-4">
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

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-500"
          >
            Enviar instrucciones
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          ¿Recordaste tu contraseña?{' '}
          <Link href="/login" className="text-blue-400 hover:underline">
            Volver al inicio de sesión
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function ForgotPasswordPage(props: ForgotPasswordProps) {
  return (
    <Suspense fallback={<ForgotPasswordFallback />}>
      <ForgotPasswordForm searchParams={props.searchParams} />
    </Suspense>
  )
}
