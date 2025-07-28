"use client";

import { GuestStatus } from "@/generated/prisma";
import React from "react";

type StatusTagProps = {
  status: GuestStatus;
};

export function StatusTag({ status }: Readonly<StatusTagProps>) {
  const renderColors = () => {
    switch (status) {
      case "ABSENT":
        return { fg: `text-red-600`, bg: "bg-red-100" };
      case "WAITING":
        return { fg: `text-yellow-600`, bg: "bg-yellow-50" };
      case "CONFIRMED":
        return { fg: `text-green-600`, bg: "bg-green-100" };
      case "PRESENT":
        return { fg: `text-primary`, bg: "bg-primary/20" };
    }
  };

  let fg = renderColors().fg;
  let bg = renderColors().bg;

  return (
    <div
      className={`rounded-full ${fg} ${bg} flex items-center justify-center py-1 px-4 w-fit text-sm font-medium`}
    >
      <span>{status}</span>
    </div>
  );
}
