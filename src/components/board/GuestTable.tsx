"use client";

import { Guest, Table } from "@/generated/prisma";
import { DataTable } from "./DataTable";
import { SectionWithDialog } from "../CustomDialog";
import { Button } from "../ui/button";
import { Eye, Pencil, Plus } from "lucide-react";
import { NewGuestForm } from "../forms/NewGuestForm";
import UpdateStatusForm from "../forms/UpdateStatusForm";
import GuestCard from "../GuestCard";
import StatusTag from "../StatusTag";
import { CodeCell } from "../CodeCell";

const guestColumns = [
  { header: "Nom", accessor: "name" },
  {
    header: "Statut",
    accessor: "status",
    renderCell: (row: Guest) => <StatusTag data={row} />,
  },
  { header: "Place", accessor: "seatNumber" },
  {
    header: "Code",
    accessor: "code",
    renderCell: (row: Guest) => <CodeCell code={row.code} />,
  },
  {
    header: "Date de réservation",
    accessor: "createdAt",
    renderCell: (row: Guest) => (
      <span>{row.createdAt.toLocaleDateString()}</span>
    ),
  },
];

type GuestTableProps = {
  guests: Guest[];
  tables: Table[];
};

export function GuestTable({ guests, tables }: Readonly<GuestTableProps>) {
  const haveTables = () => {
    if (tables.length < 1) {
      return false;
    }

    return true;
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold mb-2">Liste des tables</h3>

        {haveTables() ? (
          <SectionWithDialog
            dialogTitle="Ajouter un invité"
            dialogDescription="Remplis le formulaire ci-dessous pour ajouter une table."
            trigger={
              <Button>
                <Plus /> Ajouter
              </Button>
            }
          >
            <NewGuestForm tables={tables as any} />
          </SectionWithDialog>
        ) : (
          <div className="rounded-md text-gray-500 bg-gray-100 text-sm px-6 py-1">
            <span>Aucune table présente</span>
          </div>
        )}
      </div>

      <DataTable
        columns={guestColumns}
        data={guests}
        renderActions={(row) => (
          <div className="w-fit flex items-center">
            <SectionWithDialog
              dialogTitle="Voir l'invité"
              dialogDescription="Détails de l'invité"
              trigger={
                <Button variant="secondary" size="icon" title="Voir">
                  <Eye className="w-4 h-4" />
                </Button>
              }
            >
              <GuestCard data={row} />
            </SectionWithDialog>

            <SectionWithDialog
              dialogTitle={`Modifier ${row.name}`}
              dialogDescription="Mettre à jour le statut"
              trigger={
                <Button
                  variant="secondary"
                  size="sm"
                  title="Mise a jour du statut"
                  className="w-fit"
                >
                  <Pencil />
                  Mise à jour
                </Button>
              }
            >
              <UpdateStatusForm guestId={row.id} />
            </SectionWithDialog>
          </div>
        )}
      />
    </div>
  );
}
