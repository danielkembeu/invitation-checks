"use client";

import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export function AddGuestButton() {
  return (
    <Button>
      <Plus /> Ajouter
    </Button>
  );
}
