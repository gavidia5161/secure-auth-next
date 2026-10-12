
import Link from 'next/link'

export default function ConfirmEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-6 text-white">
      <section className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 text-center shadow-xl">
        <div className="mb-4 text-5xl" aria-hidden="true">
          📩
        </div>

        <h1 className="mb-3 text-2xl font-bold">
          ¡Revisa tu correo!
        </h1>

        <p className="mb-6 leading-7 text-gray-300">
          Tu registro se ha procesado correctamente.
          Si la verificación de correo está habilitada,
          revisa tu bandeja de entrada y sigue el enlace
          que te enviamos para activar tu cuenta.
        </p>

        <p className="mb-6 text-sm text-gray-400">
          Si no encuentras el mensaje, revisa también
          la carpeta de spam.
        </p>

        <Link
          href="/login"
          className="inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
        >
          Ir a iniciar sesión
        </Link>
      </section>
    </main>
  )
}
