"use client";

import { Table } from "@/generated/prisma";
import React from "react";
import { SectionWithDialog } from "../CustomDialog";
import NewTableForm from "../forms/NewTableForm";
import { DataTable } from "./DataTable";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import TableDetailsCard from "../TableDetailsCard";

const tablesColumns = [
  { header: "Nom de la table", accessor: "tableName" },
  { header: "Capacité de table", accessor: "capacity" },
  { header: "Numéro de la table", accessor: "tableNumber" },
];

type TablesTableProps = {
  tables: Table[];
};

export function TablesTable({ tables }: Readonly<TablesTableProps>) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold mb-2">Liste des tables</h3>

        <SectionWithDialog
          dialogTitle="Ajouter une table"
          dialogDescription="Remplis le formulaire ci-dessous pour ajouter une table."
        >
          <NewTableForm tablesLength={tables.length} />
        </SectionWithDialog>
      </div>

      <DataTable
        columns={tablesColumns}
        data={tables}
        renderActions={(row) => (
          <div className="grid grid-cols-3 gap-4 justify-center">
            <SectionWithDialog
              dialogTitle="Ajouter une table"
              dialogDescription="Remplis le formulaire ci-dessous pour ajouter une table."
              trigger={
                <Button variant="secondary" size="icon" title="Voir">
                  <Eye className="w-4 h-4" />
                </Button>
              }
            >
              <TableDetailsCard data={row as any} />
            </SectionWithDialog>
          </div>
        )}
      />
    </div>
  );
}
