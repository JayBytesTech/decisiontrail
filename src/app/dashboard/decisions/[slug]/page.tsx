import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { decisions } from "@/db/schema";
import { formatDate, getStatusStyles } from "@/lib/utils";
import { ExportActions } from "./export-actions";

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
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-950"
          >
            <svg
              className="mr-2 h-4 w-4"
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
            Back to decisions
          </Link>

          <ExportActions decision={decision} />
        </div>

        <header className="mt-8 border-b border-zinc-200 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
              {decision.projectName}
            </span>
            <span
              className={`rounded-full border px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${getStatusStyles(
                decision.status,
              )}`}
            >
              {decision.status}
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">
            {decision.title}
          </h1>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {decision.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <time className="text-sm text-zinc-500">
              {formatDate(decision.createdAt)}
            </time>
          </div>
        </header>

        <div className="mt-10 space-y-12">
          {decision.summary && (
            <section>
              <h2 className="text-lg font-semibold text-zinc-950">Summary</h2>
              <p className="mt-3 text-zinc-700 leading-relaxed">
                {decision.summary}
              </p>
            </section>
          )}

          <section>
            <h2 className="text-lg font-semibold text-zinc-950">Context</h2>
            <div className="mt-3 text-zinc-700 leading-relaxed whitespace-pre-wrap">
              {decision.context}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-950">
              Options Considered
            </h2>
            <div className="mt-3 text-zinc-700 leading-relaxed whitespace-pre-wrap">
              {decision.optionsConsidered}
            </div>
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-6">
            <h2 className="text-lg font-semibold text-emerald-900">Decision</h2>
            <div className="mt-3 text-emerald-900 leading-relaxed whitespace-pre-wrap">
              {decision.decision}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-zinc-950">Consequences</h2>
            <div className="mt-3 text-zinc-700 leading-relaxed whitespace-pre-wrap">
              {decision.consequences}
            </div>
          </section>
        </div>

        <footer className="mt-20 border-t border-zinc-200 pt-10 pb-20">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-400">
              Last updated on {formatDate(decision.updatedAt)}
            </p>
            <div className="flex gap-4">
              <ExportActions decision={decision} />
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
