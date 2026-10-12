
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center text-white">
      <div className="max-w-xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
          Next.js · Supabase
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Secure Auth
        </h1>

        <p className="text-lg leading-8 text-zinc-300">
          Sistema de autenticación segura con cookies httpOnly,
          gestión de sesiones y rutas protegidas.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-cyan-400"
          >
            Iniciar sesión
          </Link>

          <Link
            href="/signup"
            className="rounded-lg border border-zinc-600 px-6 py-3 font-semibold transition hover:bg-zinc-800"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </main>
  );
}
