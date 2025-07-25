"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

// Définition du type extrait
type SectionWithDialogProps = {
  title?: string;
  dialogTitle: string;
  dialogDescription: string;
  children?: React.ReactNode;
  trigger?: React.ReactNode;
};

export function SectionWithDialog({
  title,
  dialogTitle,
  dialogDescription,
  children,
  trigger,
}: Readonly<SectionWithDialogProps>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>
            <Plus />
            Ajouter
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-primary">{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
