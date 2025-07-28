"use client";

import { Guest, GuestStatus } from "@/generated/prisma";
import React from "react";

export function GuestCard({ data }: Readonly<{ data: Guest }>) {
  let statusColor = "bg-primary/10 text-primary";

  if (data.status === GuestStatus.CONFIRMED)
    statusColor = "bg-green-100 text-green-600";
  else if (data.status === GuestStatus.WAITING)
    statusColor = "bg-yellow-50 text-yellow-600";
  else if (data.status === GuestStatus.ABSENT)
    statusColor = "bg-red-100 text-red-600";
  else if (data.status === GuestStatus.PRESENT)
    statusColor = "bg-primary/15 text-primary";

  return (
    <section className="flex justify-center">
      <div className="rounded-2xl border bg-card text-card-foreground p-7 w-full flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <div className="flex-shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center w-14 h-14 text-3xl font-bold uppercase shadow-inner">
            {data.name?.[0] ?? "?"}
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight">{data.name}</h2>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="font-semibold">Code :</span>{" "}
              <span className="font-mono">{data.code}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-4 mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground mb-1">Statut</span>
            <span
              className={`font-medium rounded-full px-4 py-1 w-fit text-sm ${statusColor} transition-colors`}
            >
              {data.status}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground mb-1">
              Numéro de place
            </span>
            <span className="font-medium text-sm">
              {data.seatNumber ?? (
                <span className="text-gray-400 italic">Non attribuée</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
