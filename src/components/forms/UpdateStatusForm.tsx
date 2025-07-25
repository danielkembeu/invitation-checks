"use client";

import React, { useActionState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DialogFooter } from "../ui/dialog";
import { SubmitButton } from "./SubmitButton";
import { GuestStatus } from "@/generated/prisma";
import { updateGuestStatus } from "@/app/actions/update-status";
import { Message } from "./AdminLoginForm";

type UpdateStatusFormProps = {
  guestId: string;
};

export default function UpdateStatusForm({
  guestId,
}: Readonly<UpdateStatusFormProps>) {
  const [state, update] = useActionState(updateGuestStatus, {
    message: "",
  });

  return (
    <form action={update} className="space-y-2">
      <input name="guestId" type="hidden" value={guestId} readOnly />

      {state?.message && <Message message={state.message} />}

      <Select name="newStatus">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choisir la table" />
        </SelectTrigger>

        <SelectContent>
          {Object.values(GuestStatus).map((t) => (
            <SelectItem key={t} value={t}>
              {t}
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
