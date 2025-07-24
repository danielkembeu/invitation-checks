"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { GuestStatus, Table } from "@/generated/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import generateUniqueCode from "@/helpers/generateUniqueCode";
import { RefreshCcw } from "lucide-react";
import { addGuest } from "@/app/actions/create-guest";
import { toast } from "sonner";
import { Message } from "./AdminLoginForm";

function getAndIncrementSeatNumber(start: number) {
  let current = parseInt(localStorage.getItem("current") ?? "0", 10);
  if (!current || isNaN(current)) {
    current = start;
  }
  localStorage.setItem("current", (current + 1).toString());
  return current;
}

type NewGuestFormProps = {
  tables: Table[];
};

export function NewGuestForm({ tables }: Readonly<NewGuestFormProps>) {
  const [code, setCode] = useState(generateUniqueCode());
  const [message, setMessage] = useState("");
  const [selectedTable, setSelectedTable] = useState<string>("");

  async function saveGuest(event: FormEvent) {
    event.preventDefault();
    try {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);

      const seatNumber = getAndIncrementSeatNumber(tables.length);

      const payload = {
        name: formData.get("name") as string,
        status: GuestStatus.WAITING,
        tableId: selectedTable,
        code,
        seatNumber,
      };

      const result = await addGuest(payload);

      if (typeof result === "string") {
        setMessage(result);
      } else {
        toast.success("Invité ajouté avec succès !", { position: "top-right" });
      }
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={saveGuest}>
      {message && <Message message={message} />}

      <Input
        name="name"
        id="name"
        placeholder="Entrez le nom complet"
        onChange={() => {}}
      />

      <div className="flex items-center justify-between gap-4">
        <Input name="code" id="code" value={code} className="flex-1" readOnly />
        <Button
          type="button"
          size="icon"
          onClick={() => setCode(generateUniqueCode())}
        >
          <RefreshCcw />
        </Button>
      </div>

      {/* Champ caché pour la table sélectionnée */}
      <input type="hidden" name="tableId" value={selectedTable} />

      <Select value={selectedTable} onValueChange={setSelectedTable}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisir la table" />
        </SelectTrigger>

        <SelectContent>
          {tables.map((t, idx) => (
            <SelectItem key={t.id} value={t.id}>
              Table {t.tableNumber}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DialogFooter>
        <Button type="submit">Soumettre</Button>
      </DialogFooter>
    </form>
  );
}
