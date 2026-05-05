import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "@/app/(auth)/sign-out-button";

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 transition hover:opacity-80">
          <div className="h-6 w-6 rounded bg-zinc-950 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
          </div>
          <span className="text-sm font-bold tracking-tight text-zinc-950">
            DecisionTrail
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {session?.user ? (
            <>
              <Link
                className="font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
                href="/dashboard"
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                className="font-medium text-zinc-600 hover:text-zinc-950 transition-colors"
                href="/sign-in"
              >
                Sign in
              </Link>
              <Link
                className="rounded-full bg-zinc-950 px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-zinc-800 active:scale-95"
                href="/sign-up"
              >
                Create account
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
