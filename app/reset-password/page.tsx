
import { Suspense } from 'react'
import Link from 'next/link'
import { updatePassword } from '@/app/actions/auth'

type ResetPasswordProps = {
  searchParams: Promise<{
    error?: string
    code?: string
  }>
}

function ResetPasswordFallback() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <p className="text-gray-400">Cargando formulario de contraseña...</p>
    </main>
  )
}

async function ResetPasswordForm({
  searchParams,
}: ResetPasswordProps) {
  const { error, code } = await searchParams

  const errorMessage =
    error === 'invalid-input'
      ? 'La contraseña debe tener entre 8 y 72 caracteres.'
      : error === 'password-mismatch'
        ? 'Las contraseñas no coinciden.'
        : error === 'update-failed'
          ? 'No se pudo actualizar la contraseña. Intentá de nuevo.'
          : error
            ? 'El enlace no es válido o ha expirado. Solicitá uno nuevo.'
            : null

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-xl">
        <h1 className="mb-2 text-3xl font-bold">
          Nueva contraseña
        </h1>

        <p className="mb-6 text-gray-400">
          Ingresá y confirmá tu nueva contraseña.
        </p>

        {errorMessage && (
          <p role="alert" className="mb-4 rounded-lg bg-red-950 p-3 text-sm text-red-300">
            {errorMessage}
          </p>
        )}

        {!code ? (
          <div>
            <p className="mb-4 text-sm text-gray-300">
              Para continuar, abrí el enlace de recuperación que recibiste por correo.
            </p>
            <Link href="/forgot-password" className="text-blue-400 hover:underline">
              Solicitar otro enlace
            </Link>
          </div>
        ) : (
          <form action={updatePassword} className="space-y-4">
            <input type="hidden" name="code" value={code} />

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium">
                Nueva contraseña
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
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                maxLength={72}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-500"
            >
              Cambiar contraseña
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          <Link href="/login" className="text-blue-400 hover:underline">
            Volver al inicio de sesión
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function ResetPasswordPage(props: ResetPasswordProps) {
  return (
    <Suspense fallback={<ResetPasswordFallback />}>
      <ResetPasswordForm searchParams={props.searchParams} />
    </Suspense>
  )
}
