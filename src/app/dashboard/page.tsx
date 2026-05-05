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
    filters.push(eq(decisions.status, status as any));
  }

  const userDecisions = await db
    .select()
    .from(decisions)
    .where(and(...filters))
    .orderBy(desc(decisions.createdAt));

  return (
    <main className="px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            Decisions
          </h1>
          <Link
            className="flex h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-medium text-white transition hover:bg-zinc-800"
            href="/dashboard/new"
          >
            New Decision
          </Link>
        </div>

        <div className="mt-8">
          <SearchFilters />
        </div>

        <div className="py-10">
          {userDecisions.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 py-20 text-center">
              <h3 className="text-lg font-medium text-zinc-900">
                {q || status ? "No results found" : "No decisions yet"}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">
                {q || status
                  ? "Try adjusting your search or filters."
                  : "Get started by documenting your first technical decision."}
              </p>
              {!(q || status) && (
                <Link
                  className="mt-6 text-sm font-medium text-zinc-950 underline underline-offset-4 hover:text-zinc-700"
                  href="/dashboard/new"
                >
                  Create your first decision
                </Link>
              )}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {userDecisions.map((decision) => (
                <Link
                  key={decision.id}
                  href={`/dashboard/decisions/${decision.slug}`}
                  className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      {decision.projectName}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${getStatusStyles(
                        decision.status,
                      )}`}
                    >
                      {decision.status}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold text-zinc-950 group-hover:text-zinc-800">
                    {decision.title}
                  </h3>
                  {decision.summary && (
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
                      {decision.summary}
                    </p>
                  )}
                  <div className="mt-auto pt-5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {decision.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                      {decision.tags.length > 2 && (
                        <span className="text-[11px] text-zinc-400">
                          +{decision.tags.length - 2}
                        </span>
                      )}
                    </div>
                    <time className="text-xs text-zinc-400">
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
