"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  createDecisionAction,
  updateDecisionAction,
  type DecisionFormState,
} from "./actions";

type DecisionFormProps = {
  decision?: {
    id: string;
    title: string;
    projectName: string;
    status: "proposed" | "accepted" | "superseded" | "archived";
    summary: string | null;
    context: string;
    optionsConsidered: string;
    decision: string;
    consequences: string;
    tags: string[];
  };
};

const initialState: DecisionFormState = {};

export function DecisionForm({ decision }: DecisionFormProps) {
  const isEditing = !!decision;
  const action = isEditing
    ? updateDecisionAction.bind(null, decision.id)
    : createDecisionAction;

  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900" htmlFor="title">
          Decision Title
        </label>
        <input
          className="h-11 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
          id="title"
          name="title"
          placeholder="e.g., Use PostgreSQL instead of SQLite"
          type="text"
          defaultValue={decision?.title}
          required
        />
        <FieldErrors errors={state.errors?.title} />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-zinc-900"
          htmlFor="projectName"
        >
          Project Name
        </label>
        <input
          className="h-11 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
          id="projectName"
          name="projectName"
          placeholder="e.g., DecisionTrail"
          type="text"
          defaultValue={decision?.projectName}
          required
        />
        <FieldErrors errors={state.errors?.projectName} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900" htmlFor="status">
          Status
        </label>
        <select
          className="h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-sm outline-none transition focus:border-zinc-900"
          id="status"
          name="status"
          defaultValue={decision?.status ?? "proposed"}
          required
        >
          <option value="proposed">Proposed</option>
          <option value="accepted">Accepted</option>
          <option value="superseded">Superseded</option>
          <option value="archived">Archived</option>
        </select>
        <FieldErrors errors={state.errors?.status} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900" htmlFor="summary">
          Summary (Optional)
        </label>
        <textarea
          className="min-h-[80px] w-full rounded-md border border-zinc-300 p-3 text-sm outline-none transition focus:border-zinc-900"
          id="summary"
          name="summary"
          placeholder="A brief one-sentence summary of the decision."
          defaultValue={decision?.summary ?? ""}
        />
        <FieldErrors errors={state.errors?.summary} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900" htmlFor="context">
          Context
        </label>
        <textarea
          className="min-h-[120px] w-full rounded-md border border-zinc-300 p-3 text-sm outline-none transition focus:border-zinc-900"
          id="context"
          name="context"
          placeholder="What is the problem we are solving? What is the background?"
          defaultValue={decision?.context}
          required
        />
        <FieldErrors errors={state.errors?.context} />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-zinc-900"
          htmlFor="optionsConsidered"
        >
          Options Considered
        </label>
        <textarea
          className="min-h-[120px] w-full rounded-md border border-zinc-300 p-3 text-sm outline-none transition focus:border-zinc-900"
          id="optionsConsidered"
          name="optionsConsidered"
          placeholder="What were the alternatives? List them and their pros/cons."
          defaultValue={decision?.optionsConsidered}
          required
        />
        <FieldErrors errors={state.errors?.optionsConsidered} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900" htmlFor="decision">
          Decision
        </label>
        <textarea
          className="min-h-[120px] w-full rounded-md border border-zinc-300 p-3 text-sm outline-none transition focus:border-zinc-900"
          id="decision"
          name="decision"
          placeholder="What did we choose and why?"
          defaultValue={decision?.decision}
          required
        />
        <FieldErrors errors={state.errors?.decision} />
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-zinc-900"
          htmlFor="consequences"
        >
          Consequences
        </label>
        <textarea
          className="min-h-[120px] w-full rounded-md border border-zinc-300 p-3 text-sm outline-none transition focus:border-zinc-900"
          id="consequences"
          name="consequences"
          placeholder="What are the results of this decision? What is the impact?"
          defaultValue={decision?.consequences}
          required
        />
        <FieldErrors errors={state.errors?.consequences} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900" htmlFor="tags">
          Tags (Comma separated)
        </label>
        <input
          className="h-11 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
          id="tags"
          name="tags"
          placeholder="e.g., database, architecture, infra"
          type="text"
          defaultValue={decision?.tags.join(", ")}
        />
        <FieldErrors errors={state.errors?.tags} />
      </div>

      {state.message ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}

      <div className="flex items-center gap-3 pt-4">
        <Link
          className="flex h-11 items-center rounded-md border border-zinc-300 px-5 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          href={isEditing ? `/dashboard/decisions/${decision.id}` : "/dashboard"}
        >
          Cancel
        </Link>
        <button
          className="h-11 flex-1 rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={pending}
          type="submit"
        >
          {pending
            ? isEditing
              ? "Updating..."
              : "Creating..."
            : isEditing
              ? "Update decision"
              : "Create decision"}
        </button>
      </div>
    </form>
  );
}

function FieldErrors({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return (
    <ul className="space-y-1">
      {errors.map((error) => (
        <li className="text-sm text-red-700" key={error}>
          {error}
        </li>
      ))}
    </ul>
  );
}
