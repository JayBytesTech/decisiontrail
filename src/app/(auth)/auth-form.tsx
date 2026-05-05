"use client";

import Link from "next/link";
import { useActionState } from "react";
import type { AuthFormState } from "./actions";
import { signInAction, signUpAction } from "./actions";

type AuthFormProps = {
  mode: "sign-in" | "sign-up";
};

const initialState: AuthFormState = {};

export function AuthForm({ mode }: AuthFormProps) {
  const isSignUp = mode === "sign-up";
  const action = isSignUp ? signUpAction : signInAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-4">
        {isSignUp ? (
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest" htmlFor="name">
              Full Name
            </label>
            <input
              className="block h-12 w-full rounded-full border border-zinc-200 bg-white px-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
              id="name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              autoComplete="name"
            />
            <FieldErrors errors={state.errors?.name} />
          </div>
        ) : null}

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest" htmlFor="email">
            Email Address
          </label>
          <input
            className="block h-12 w-full rounded-full border border-zinc-200 bg-white px-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            autoComplete="email"
          />
          <FieldErrors errors={state.errors?.email} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest" htmlFor="password">
            Password
          </label>
          <input
            className="block h-12 w-full rounded-full border border-zinc-200 bg-white px-5 text-sm text-zinc-950 shadow-xs outline-none transition focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />
          <FieldErrors errors={state.errors?.password} />
        </div>
      </div>

      {state.message ? (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
          {state.message}
        </div>
      ) : null}

      <div className="space-y-6">
        <button
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-zinc-950 px-8 text-sm font-bold text-white shadow-xs transition hover:bg-zinc-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={pending}
          type="submit"
        >
          {pending ? "Working..." : isSignUp ? "Create account" : "Sign in"}
        </button>

        <p className="text-center text-sm font-medium text-zinc-500">
          {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
          <Link
            className="text-zinc-950 hover:underline underline-offset-4"
            href={isSignUp ? "/sign-in" : "/sign-up"}
          >
            {isSignUp ? "Sign in" : "Create one"}
          </Link>
        </p>
      </div>
    </form>
  );
}

function FieldErrors({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return (
    <div className="space-y-1 px-1">
      {errors.map((error) => (
        <p className="text-[11px] font-bold text-red-600 uppercase tracking-wider" key={error}>
          {error}
        </p>
      ))}
    </div>
  );
}
