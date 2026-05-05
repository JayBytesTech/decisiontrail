import { notFound, redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { decisions } from "@/db/schema";
import { DecisionForm } from "../../decision-form";

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
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            Edit Decision
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Update the context, options, or consequences of this decision.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <DecisionForm decision={decision} />
        </div>
      </div>
    </main>
  );
}
