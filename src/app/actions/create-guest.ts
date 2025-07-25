"use server";

import { prisma } from "@/db";
import { Guest, GuestStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

async function addGuest(
  data: Omit<Guest, "id">
): Promise<string | undefined> {
  try {
    await prisma.guest.create({ data });
    revalidatePath("/dashboard");
  } catch (error: any) {
    return error.message;
  }
}

export async function saveGuest(prevState: any, formData: FormData) {
  // Les props ne sont pas accessibles côté server action, donc on ne peut pas vérifier la capacité ici
  // On suppose que la vérification de la capacité doit être faite côté client avant submit
  // On récupère les valeurs du formData
  const name = formData.get("name") as string;
  const tableId = formData.get("tableId") as string;
  const code = formData.get("code") as string;
  const seatNumber = Number(formData.get("seatNumber"));

  const payload = {
    name,
    status: GuestStatus.WAITING,
    tableId,
    code,
    seatNumber,
  };

  try {
    const result = await addGuest(payload);

    if (typeof result === "string") {
      return { message: result, ok: false };
    } else {
      return { message: "Invité ajouté avec succès !", ok: true };
    }
  } catch {
    return { message: "Erreur lors de l'ajout de l'invité.", ok: false };
  }
}
