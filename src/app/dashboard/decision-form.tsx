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
    slug?: string;
  };
};

const initialState: DecisionFormState = {};

export function DecisionForm({ decision }: DecisionFormProps) {
  const isEditing = !!decision;
  const action = isEditing
    ? updateDecisionAction.bind(null, decision.id)
    : createDecisionAction;

  const [state, formAction, pending] = useActionState(action, initialState);

  const backHref = isEditing && decision.slug 
    ? `/dashboard/decisions/${decision.slug}` 
    : "/dashboard";

  return (
    <form action={formAction} className="space-y-10">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest" htmlFor="title">
            Decision Title
          </label>
          <input
            className="block h-12 w-full rounded-full border border-zinc-200 bg-white px-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
            id="title"
            name="title"
            placeholder="e.g., Use PostgreSQL instead of SQLite"
            type="text"
            defaultValue={decision?.title}
            required
          />
          <FieldErrors errors={state.errors?.title} />
        </div>

        <div className="space-y-3">
          <label
            className="text-xs font-bold text-zinc-400 uppercase tracking-widest"
            htmlFor="projectName"
          >
            Project Name
          </label>
          <input
            className="block h-12 w-full rounded-full border border-zinc-200 bg-white px-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
            id="projectName"
            name="projectName"
            placeholder="e.g., DecisionTrail"
            type="text"
            defaultValue={decision?.projectName}
            required
          />
          <FieldErrors errors={state.errors?.projectName} />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest" htmlFor="status">
            Current Status
          </label>
          <select
            className="block h-12 w-full rounded-full border border-zinc-200 bg-white px-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950 cursor-pointer"
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

        <div className="space-y-3">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest" htmlFor="tags">
            Tags (Comma separated)
          </label>
          <input
            className="block h-12 w-full rounded-full border border-zinc-200 bg-white px-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
            id="tags"
            name="tags"
            placeholder="e.g., database, architecture, infra"
            type="text"
            defaultValue={decision?.tags.join(", ")}
          />
          <FieldErrors errors={state.errors?.tags} />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest" htmlFor="summary">
          Executive Summary
        </label>
        <textarea
          className="block min-h-[100px] w-full rounded-3xl border border-zinc-200 bg-white p-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
          id="summary"
          name="summary"
          placeholder="A brief one-sentence summary of the decision."
          defaultValue={decision?.summary ?? ""}
        />
        <FieldErrors errors={state.errors?.summary} />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest" htmlFor="context">
            Context & Problem
          </label>
          <textarea
            className="block min-h-[180px] w-full rounded-3xl border border-zinc-200 bg-white p-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
            id="context"
            name="context"
            placeholder="What is the problem we are solving? What is the background?"
            defaultValue={decision?.context}
            required
          />
          <FieldErrors errors={state.errors?.context} />
        </div>

        <div className="space-y-3">
          <label
            className="text-xs font-bold text-zinc-400 uppercase tracking-widest"
            htmlFor="optionsConsidered"
          >
            Options Considered
          </label>
          <textarea
            className="block min-h-[180px] w-full rounded-3xl border border-zinc-200 bg-white p-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
            id="optionsConsidered"
            name="optionsConsidered"
            placeholder="What were the alternatives? List them and their pros/cons."
            defaultValue={decision?.optionsConsidered}
            required
          />
          <FieldErrors errors={state.errors?.optionsConsidered} />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest" htmlFor="decision">
            The Decision
          </label>
          <textarea
            className="block min-h-[180px] w-full rounded-3xl border border-zinc-950 bg-white p-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
            id="decision"
            name="decision"
            placeholder="What did we choose and why?"
            defaultValue={decision?.decision}
            required
          />
          <FieldErrors errors={state.errors?.decision} />
        </div>

        <div className="space-y-3">
          <label
            className="text-xs font-bold text-zinc-400 uppercase tracking-widest"
            htmlFor="consequences"
          >
            Consequences
          </label>
          <textarea
            className="block min-h-[180px] w-full rounded-3xl border border-zinc-200 bg-white p-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
            id="consequences"
            name="consequences"
            placeholder="What are the results of this decision? What is the impact?"
            defaultValue={decision?.consequences}
            required
          />
          <FieldErrors errors={state.errors?.consequences} />
        </div>
      </div>

      {state.message ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
          {state.message}
        </div>
      ) : null}

      <div className="flex items-center gap-4 pt-4">
        <Link
          className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-sm font-bold text-zinc-600 transition hover:bg-zinc-50 active:scale-95"
          href={backHref}
        >
          Cancel
        </Link>
        <button
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-zinc-950 px-8 text-sm font-bold text-white shadow-xs transition hover:bg-zinc-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={pending}
          type="submit"
        >
          {pending
            ? isEditing
              ? "Saving changes..."
              : "Creating..."
            : isEditing
              ? "Update Decision"
              : "Create Decision"}
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
    <div className="space-y-1 mt-1">
      {errors.map((error) => (
        <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}
