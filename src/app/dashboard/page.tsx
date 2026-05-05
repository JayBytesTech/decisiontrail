import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="border-b border-zinc-200 pb-6">
          <p className="text-sm font-medium text-zinc-500">DecisionTrail</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950">
            Decisions
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600">
            The authenticated workspace is in place. The next milestone is the
            decision model workflow: create, list, detail, edit, filter, and
            export.
          </p>
        </div>
      </div>
    </main>
  );
}
