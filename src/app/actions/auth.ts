"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const adminCreds = {
  email: process.env.NEXT_PUBLIC_ROOT_EMAIL,
  password: process.env.NEXT_PUBLIC_ROOT_PWD,
};

function loginAdmin(email: string, password: string) {
  if (email !== adminCreds.email || password !== adminCreds.password) {
    return false;
  } else {
    return true;
  }
}

export async function login(prev: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const ok = loginAdmin(email, password);

  if (ok) {
    const key = process.env.NEXT_PUBLIC_LSK ?? "";

    (await cookies()).set(key, String(ok), {
      path: "/",
      httpOnly: true,
    });

    return { ok: true };
  } else {
    return {
      ok: false,
      message: "Informations de connexion invalides. Veuillez réessayer",
    };
  }
}

export async function logout() {
  const key = process.env.NEXT_PUBLIC_LSK ?? "";

  (await cookies()).delete(key);
  redirect("/auth");
}
