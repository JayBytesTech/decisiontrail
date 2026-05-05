import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="relative isolate overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-zinc-200 to-zinc-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-zinc-950/5 px-3 py-1 text-xs font-semibold leading-6 text-zinc-950 ring-1 ring-inset ring-zinc-950/10">
                Latest updates
              </span>
              <span className="inline-flex items-center space-x-2 text-xs font-medium leading-6 text-zinc-600">
                <span>Just shipped v1.0</span>
              </span>
            </a>
          </div>
          <h1 className="mt-10 text-5xl font-bold tracking-tight text-zinc-950 sm:text-7xl">
            Preserve the <span className="text-zinc-500">why</span> behind your decisions.
          </h1>
          <p className="mt-8 text-lg font-medium text-zinc-600 sm:text-xl/8">
            DecisionTrail helps software teams capture context, options,
            tradeoffs, and consequences before they are lost to time.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href={session?.user ? "/dashboard" : "/sign-up"}
              className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-xs hover:bg-zinc-800 transition active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
            >
              {session?.user ? "Go to Dashboard" : "Get started free"}
            </Link>
            <Link
              href="/docs"
              className="text-sm font-semibold leading-6 text-zinc-950 hover:text-zinc-700 transition"
            >
              Read docs <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
