import { redirect } from "next/navigation";
import Link from "next/link";
import { eq, desc, and, ilike, or, sql } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { decisions } from "@/db/schema";
import { formatDate, getStatusStyles } from "@/lib/utils";
import { SearchFilters } from "./search-filters";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const session = await auth();
  const { q, status } = await searchParams;

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const filters = [eq(decisions.userId, session.user.id)];

  if (q) {
    filters.push(
      or(
        ilike(decisions.title, `%${q}%`),
        ilike(decisions.projectName, `%${q}%`),
        sql`${decisions.tags}::text ilike ${`%${q}%`}`,
      )!,
    );
  }

  if (status && status !== "all") {
    filters.push(eq(decisions.status, status as "proposed" | "accepted" | "superseded" | "archived"));
  }

  const userDecisions = await db
    .select()
    .from(decisions)
    .where(and(...filters))
    .orderBy(desc(decisions.createdAt));

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-50/50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
              Decisions
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Manage and track your technical decision history.
            </p>
          </div>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-95"
            href="/dashboard/new"
          >
            New Decision
          </Link>
        </div>

        <div className="mt-10">
          <SearchFilters />
        </div>

        <div className="mt-8">
          {userDecisions.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-zinc-200 bg-white px-6 py-24 text-center shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-400">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-zinc-950">
                {q || status ? "No matching decisions" : "No decisions yet"}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-zinc-600">
                {q || status
                  ? "Adjust your filters or try a different search term to find what you're looking for."
                  : "Start documenting your first technical decision to build your project's knowledge base."}
              </p>
              {!(q || status) && (
                <Link
                  className="mt-8 rounded-full border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-50 active:scale-95"
                  href="/dashboard/new"
                >
                  Create your first decision
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userDecisions.map((decision) => (
                <Link
                  key={decision.id}
                  href={`/dashboard/decisions/${decision.slug}`}
                  className="group relative flex flex-col rounded-3xl border border-zinc-200 bg-white p-6 shadow-xs transition hover:border-zinc-300 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-bold text-zinc-600 uppercase tracking-wider">
                      {decision.projectName}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${getStatusStyles(
                        decision.status,
                      )}`}
                    >
                      {decision.status}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-zinc-950 group-hover:text-zinc-800 transition-colors leading-tight">
                    {decision.title}
                  </h3>
                  {decision.summary && (
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600 leading-relaxed">
                      {decision.summary}
                    </p>
                  )}
                  <div className="mt-auto pt-6 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {decision.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[12px] font-medium text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                      {decision.tags.length > 2 && (
                        <span className="text-[12px] font-medium text-zinc-400">
                          +{decision.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <time className="text-xs font-medium text-zinc-400">
                      {formatDate(decision.createdAt)}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
