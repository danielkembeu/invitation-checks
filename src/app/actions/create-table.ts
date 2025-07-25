"use server";

import { prisma } from "@/db";
import { Table } from "@/generated/prisma";
import { revalidatePath } from "next/cache";

export async function addTable(prevState: any, formData: FormData) {
  try {
    const tableName = formData.get("tableName") as string;
    const tableNumber = formData.get("tableNumber") as string;
    const capacity = formData.get("capacity") as string;

    const payload: Omit<Table, "id"> = {
      tableName,
      tableNumber: parseInt(tableNumber) + 1,
      capacity: parseInt(capacity),
      createdAt: new Date(),
    };

    await prisma.table.create({ data: payload });

    revalidatePath("/dashboard");
  } catch (error: any) {
    console.log("[prisma update error]", error);
    return { message: "Quelque chose a mal tourné" };
  }
}
