"use client";

import { useState, useActionState } from "react";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import { Guest, Table } from "@/generated/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import generateUniqueCode from "@/helpers/generateUniqueCode";
import { RefreshCcw } from "lucide-react";
import { saveGuest } from "@/app/actions/create-guest";
import { toast } from "sonner";
import { Message } from "./AdminLoginForm";
import { SubmitButton } from "./SubmitButton";

function getAndIncrementSeatNumber(start: number) {
  let current = parseInt(localStorage.getItem("current") ?? "0", 10);

  if (!current || isNaN(current)) {
    current = start;
  }

  localStorage.setItem("current", (current + 1).toString());
  return current;
}

type NewGuestFormProps = {
  tables: (Table & { guests: Guest[] })[];
};

export function NewGuestForm({ tables }: Readonly<NewGuestFormProps>) {
  const [code, setCode] = useState(generateUniqueCode());
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [seatNumber, setSeatNumber] = useState<number | null>(null);

  // useActionState pour gérer le retour de la server action
  const [state, formAction] = useActionState(saveGuest, {
    message: "",
    ok: false,
  });

  // On gère la vérification de la capacité côté client avant submit
  function handleFormSubmit(formData: FormData) {
    const selectedTableId = formData.get("tableId") as string;
    const table = tables.find((t) => t.id === selectedTableId);

    if (table && table.capacity < table.guests.length) {
      toast.error(
        "La capacité de la table a été excédée. Veuillez sélectionner une autre table"
      );
      return;
    }

    // Génère le seatNumber et l'ajoute au formData
    const sn = getAndIncrementSeatNumber(tables.length);
    setSeatNumber(sn);

    formData.set("seatNumber", sn.toString());

    setCode(generateUniqueCode());
    // On laisse le formAction s'occuper du reste (server action)
    return formAction(formData);
  }

  return (
    <form action={handleFormSubmit} className="space-y-4">
      {state.message && state.ok === false && (
        <Message message={state.message} />
      )}

      <Input
        name="name"
        id="name"
        placeholder="Entrez le nom complet"
        required
      />

      <div className="flex items-center gap-4">
        <Input
          name="code"
          id="code"
          value={code}
          className="flex-grow min-w-0"
          style={{ flexBasis: "80%" }}
          readOnly
        />

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
      {/* Champ caché pour seatNumber, mis à jour lors du submit */}
      <input type="hidden" name="seatNumber" value={seatNumber ?? ""} />

      <Select
        name="tableId"
        value={selectedTable}
        onValueChange={setSelectedTable}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisir la table" />
        </SelectTrigger>

        <SelectContent>
          {tables.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.tableName} - Table {t.tableNumber}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DialogFooter>
        <SubmitButton />
      </DialogFooter>
    </form>
  );
}
