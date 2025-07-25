"use client";

import React, { useActionState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DialogFooter } from "../ui/dialog";
import { SubmitButton } from "./SubmitButton";
import { Message } from "./AdminLoginForm";
import { addTable } from "@/app/actions/create-table";

type NewTableFormProps = {
  tablesLength: number;
};

export default function NewTableForm({
  tablesLength,
}: Readonly<NewTableFormProps>) {
  const [state, createTable] = useActionState(addTable, {
    message: "",
  });

  return (
    <form action={createTable} className="space-y-4">
      <input type="hidden" name="tableNumber" value={tablesLength} readOnly />

      {state?.message && <Message message={state.message} />}

      <div className="space-y-2">
        <Label>Nom de la table</Label>
        <Input name="tableName" placeholder="Table xyz..." />
      </div>

      <div className="space-y-2">
        <Label>Capacité totale</Label>
        <Input
          name="capacity"
          type="number"
          placeholder="Nombre de place total sur la table (ex: 6)"
        />
      </div>

      <DialogFooter>
        <SubmitButton />
      </DialogFooter>
    </form>
  );
}
