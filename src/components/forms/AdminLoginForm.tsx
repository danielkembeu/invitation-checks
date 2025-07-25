"use client";

import React, { useActionState } from "react";
import { redirect } from "next/navigation";
import { login } from "@/app/actions/auth";
import { SubmitButton } from "./SubmitButton";

export function AdminLoginForm() {
  const [state, formAction] = useActionState(login, { ok: false });

  if (state.ok) {
    redirect("/dashboard");
  }

  return (
    <>
      {state.message && (
        <div
          className="bg-destructive/10 border border-destructive text-destructive rounded p-3 mb-4 text-center"
          role="alert"
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            className="border rounded px-3 py-2 bg-background"
            type="email"
            name="email"
            required
            autoComplete="username"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Mot de passe</span>
          <input
            className="border rounded px-3 py-2 bg-background"
            type="password"
            name="password"
            required
            autoComplete="current-password"
          />
        </label>

        <SubmitButton btnLabel="Se connecter" loadingLabel="Connexion..." />
      </form>
    </>
  );
}

export function Message({ message }: { readonly message: string }) {
  return (
    <div
      className="bg-destructive/10 border border-destructive text-destructive rounded p-3 mb-4 text-center"
      role="alert"
    >
      {message}
    </div>
  );
}
