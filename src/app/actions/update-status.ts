"use server";

import { prisma } from "@/db";
import { GuestStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function updateGuestStatus(prevState: any, formData: FormData) {
  try {
    const newStatus = formData.get("newStatus") as GuestStatus;
    const guestId = formData.get("guestId") as string;

    await prisma.guest.update({
      where: { id: guestId },
      data: { status: newStatus },
    });

    revalidatePath("/dashboard");
  } catch (error: any) {
    console.log("[prisma update error]", error);
    return { message: "Quelque chose a mal tourné" };
  }
}
