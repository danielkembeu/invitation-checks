"use server";

const adminCreds = {
  email: process.env.NEXT_PUBLIC_ROOT_EMAIL,
  password: process.env.NEXT_PUBLIC_ROOT_PWD,
};

function loginAdmin(email: string, password: string) {
  if (email !== adminCreds.email || password !== adminCreds.password) {
    return "Informations de connexion invalides. Veuillez réessayer";
  } else {
    return true;
  }
}

export async function login(prev: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  return loginAdmin(email, password);
}
