"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/login";

export function AdminLoginForm() {
  let router = useRouter();

  let [message, setMessage] = useState("");

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const result = await login({}, formData);

    if (result !== true) {
      setMessage(result);
    } else {
      localStorage.setItem(
        process.env.NEXT_PUBLIC_LSK ?? "",
        JSON.stringify(true)
      );

      router.replace("/dashboard");
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleLogin}>
      {message && <Message message={message} />}

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Email</span>
        <Input
          className="border rounded px-3 py-2 bg-background"
          type="email"
          name="email"
          required
          autoComplete="username"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium">Mot de passe</span>
        <Input
          className="border rounded px-3 py-2 bg-background"
          type="password"
          name="password"
          required
          autoComplete="current-password"
        />
      </label>

      <Button
        type="submit"
        className="bg-primary text-primary-foreground font-semibold py-2 rounded hover:bg-primary/90 transition"
      >
        Se connecter
      </Button>
    </form>
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
