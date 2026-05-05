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
    <form action={formAction} className="space-y-5">
      {isSignUp ? (
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900" htmlFor="name">
            Name
          </label>
          <input
            className="h-11 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
            id="name"
            name="name"
            type="text"
            autoComplete="name"
          />
          <FieldErrors errors={state.errors?.name} />
        </div>
      ) : null}

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900" htmlFor="email">
          Email
        </label>
        <input
          className="h-11 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
        />
        <FieldErrors errors={state.errors?.email} />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-900" htmlFor="password">
          Password
        </label>
        <input
          className="h-11 w-full rounded-md border border-zinc-300 px-3 text-sm outline-none transition focus:border-zinc-900"
          id="password"
          name="password"
          type="password"
          autoComplete={isSignUp ? "new-password" : "current-password"}
        />
        <FieldErrors errors={state.errors?.password} />
      </div>

      {state.message ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}

      <button
        className="h-11 w-full rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        {pending ? "Working..." : isSignUp ? "Create account" : "Sign in"}
      </button>

      <p className="text-center text-sm text-zinc-600">
        {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
        <Link
          className="font-medium text-zinc-950 underline-offset-4 hover:underline"
          href={isSignUp ? "/sign-in" : "/sign-up"}
        >
          {isSignUp ? "Sign in" : "Create one"}
        </Link>
      </p>
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
