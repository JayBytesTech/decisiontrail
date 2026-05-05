import { AuthForm } from "../auth-form";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-12">
      <section className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-sm font-medium text-zinc-500">DecisionTrail</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            Create account
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Start preserving the context behind your software decisions.
          </p>
        </div>
        <AuthForm mode="sign-up" />
      </section>
    </main>
  );
}
