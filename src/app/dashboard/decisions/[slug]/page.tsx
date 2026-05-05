import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { decisions } from "@/db/schema";
import { formatDate, getStatusStyles } from "@/lib/utils";
import { ExportActions } from "./export-actions";
import { DeleteButton } from "./delete-button";

export default async function DecisionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const [decision] = await db
    .select()
    .from(decisions)
    .where(and(eq(decisions.slug, slug), eq(decisions.userId, session.user.id)))
    .limit(1);

  if (!decision) {
    notFound();
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-50/50">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-semibold text-zinc-500 hover:text-zinc-950 transition-colors group"
          >
            <svg
              className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to dashboard
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href={`/dashboard/decisions/${decision.slug}/edit`}
              className="inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-xs font-bold text-zinc-950 border border-zinc-200 shadow-xs hover:bg-zinc-50 transition-all active:scale-95"
            >
              Edit Decision
            </Link>
            <ExportActions decision={decision} />
          </div>
        </div>

        <article className="mt-12">
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
                {decision.projectName}
              </span>
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${getStatusStyles(
                  decision.status,
                )}`}
              >
                {decision.status}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
              {decision.title}
            </h1>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-wrap gap-2">
                {decision.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-medium text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <time className="text-sm font-medium text-zinc-400">
                Created on {formatDate(decision.createdAt)}
              </time>
            </div>
          </header>

          <div className="mt-16 space-y-16">
            {decision.summary && (
              <section>
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                  Summary
                </h2>
                <p className="mt-4 text-lg text-zinc-700 leading-relaxed font-medium">
                  {decision.summary}
                </p>
              </section>
            )}

            <section>
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                Context & Problem
              </h2>
              <div className="mt-4 text-zinc-700 leading-relaxed whitespace-pre-wrap">
                {decision.context}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                Options Considered
              </h2>
              <div className="mt-4 text-zinc-700 leading-relaxed whitespace-pre-wrap">
                {decision.optionsConsidered}
              </div>
            </section>

            <section className="relative overflow-hidden rounded-3xl border border-zinc-950 bg-zinc-950 p-8 text-white shadow-xl">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/5 blur-2xl" />
              <h2 className="text-sm font-bold uppercase tracking-widest opacity-60">
                The Decision
              </h2>
              <div className="mt-4 text-xl font-medium leading-relaxed whitespace-pre-wrap">
                {decision.decision}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest">
                Consequences
              </h2>
              <div className="mt-4 text-zinc-700 leading-relaxed whitespace-pre-wrap">
                {decision.consequences}
              </div>
            </section>
          </div>
        </article>

        <footer className="mt-24 border-t border-zinc-200 pt-10 pb-20">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Last updated
              </p>
              <p className="text-sm font-medium text-zinc-600">
                {formatDate(decision.updatedAt)}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <DeleteButton decisionId={decision.id} />
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
