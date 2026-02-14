"use client";

import { useActionState } from "react";

import { type UnlockState, unlockAction } from "./actions";

const INITIAL_UNLOCK_STATE: UnlockState = {
  error: null,
};

export function UnlockForm() {
  const [state, formAction, isPending] = useActionState(unlockAction, INITIAL_UNLOCK_STATE);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm font-medium text-[#4d2d4e]">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="min-h-11 rounded-xl border border-white/60 bg-white/85 px-4 text-sm text-[#2f2030] shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-[#de5b85]"
        />
      </div>
      {state.error ? <p className="text-sm text-[#9a1f40]">{state.error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#de5b85] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7f3453] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPending ? "Unlocking..." : "Unlock Site"}
      </button>
    </form>
  );
}
