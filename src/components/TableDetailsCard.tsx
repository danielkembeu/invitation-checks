"use client";

import { Guest, Table } from "@/generated/prisma";
import React from "react";

type TableDetailsCardProps = {
  data: Table & { guests: Guest[] };
};

export default function TableDetailsCard({
  data,
}: Readonly<TableDetailsCardProps>) {
  return (
    <section className="rounded-lg border bg-white p-6 w-full mx-auto">
      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Nom</span>
          <span>{data.tableName}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Numéro</span>
          <span>{data.tableNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Capacité</span>
          <span>{data.capacity}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Nombre d'invités</span>
          <span>{data.guests.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Créée le</span>
          <span>
            {data.createdAt
              ? new Date(data.createdAt).toLocaleDateString()
              : "-"}
          </span>
        </div>
      </div>
    </section>
  );
}
