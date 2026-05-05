import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { decisions } from "@/db/schema";
import { DecisionForm } from "../../../decision-form";

export default async function EditDecisionPage({
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
        <div className="flex flex-col gap-8">
          <Link
            href={`/dashboard/decisions/${decision.slug}`}
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
            Back to decision
          </Link>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
              Edit Decision
            </h1>
            <p className="mt-2 text-zinc-600">
              Update the context, options, or consequences of this decision.
            </p>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xs">
            <DecisionForm decision={decision} />
          </div>
        </div>
      </div>
    </main>
  );
}
