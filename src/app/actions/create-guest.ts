"use server";

import { prisma } from "@/db";
import { Guest } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function addGuest(
  data: Omit<Guest, "id">
): Promise<string | undefined> {
  try {
    await prisma.guest.create({ data });
    revalidatePath("/dashboard");
  } catch (error: any) {
    return error.message;
  }
}
