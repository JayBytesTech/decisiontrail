import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DecisionForm } from "../decision-form";

export default async function NewDecisionPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            New Decision
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Document a new technical or product decision.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <DecisionForm />
        </div>
      </div>
    </main>
  );
}
