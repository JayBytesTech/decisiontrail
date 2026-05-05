import Link from "next/link";
import { auth } from "@/auth";
import { SignOutButton } from "@/app/(auth)/sign-out-button";

export async function Header() {
  const session = await auth();

  return (
    <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-5">
      <Link href="/" className="text-sm font-semibold tracking-tight text-zinc-950">
        DecisionTrail
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {session?.user ? (
          <>
            <Link
              className="font-medium text-zinc-600 hover:text-zinc-950 transition"
              href="/dashboard"
            >
              Dashboard
            </Link>
            <SignOutButton />
          </>
        ) : (
          <>
            <Link
              className="font-medium text-zinc-600 hover:text-zinc-950 transition"
              href="/sign-in"
            >
              Sign in
            </Link>
            <Link
              className="rounded-md bg-zinc-950 px-4 py-2 font-medium text-white hover:bg-zinc-800 transition"
              href="/sign-up"
            >
              Create account
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
