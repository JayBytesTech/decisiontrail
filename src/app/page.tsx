import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="px-6 py-10 text-zinc-950">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl flex-col justify-center">
        <section className="py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-zinc-500">
              Lightweight decision records for software projects
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">
              Preserve the why behind technical decisions.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
              DecisionTrail helps developers capture context, options,
              tradeoffs, consequences, and exportable Markdown records before
              project reasoning disappears.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="rounded-md bg-zinc-950 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 transition"
                href={session?.user ? "/dashboard" : "/sign-up"}
              >
                {session?.user ? "Open dashboard" : "Start documenting"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
