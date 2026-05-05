import { AuthForm } from "../auth-form";

export default function SignInPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-zinc-50/50 px-6 py-12">
      <section className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-950 text-white">
            <div className="h-3 w-3 rounded-full bg-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
            Welcome back
          </h1>
          <p className="mt-3 text-sm font-medium text-zinc-500">
            Continue documenting the why behind your code.
          </p>
        </div>
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xs">
          <AuthForm mode="sign-in" />
        </div>
      </section>
    </main>
  );
}
