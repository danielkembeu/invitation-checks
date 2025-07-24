import { Metric } from "@/components/board/Overview";
import { DataTable } from "@/components/board/DataTable";
import { prisma } from "@/db";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Check, Ban } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewGuestForm } from "@/components/forms/NewGuestForm";

async function getTables() {
  return await prisma.table.findMany();
}

async function getGuests() {
  return await prisma.guest.findMany();
}

export default async function Dashboard() {
  const guests = await getGuests();
  const tables = await getTables();

  const guestColumns = [
    { header: "Nom", accessor: "name" },
    { header: "Statut", accessor: "status" },
    { header: "Place", accessor: "seatNumber" },
    { header: "Code", accessor: "code" },
  ];

  const tablesColumns = [
    { header: "Nom", accessor: "name" },
    { header: "Statut", accessor: "status" },
    { header: "Place", accessor: "seatNumber" },
    { header: "Code", accessor: "code" },
  ];

  return (
    <section>
      {/* <Navbar /> */}

      <div className="px-96 py-20">
        <h2 className="text-xl font-bold mb-4">Gestion des invités</h2>

        <div className="flex justify-between items-center gap-2">
          <Metric label="Nombre total d'invités" value={guests.length} />
          <Metric
            label="Invités confirmés"
            value={guests.filter((g) => g.status === "CONFIRMED").length}
          />
          <Metric
            label="Invités en attente"
            value={guests.filter((g) => g.status === "WAITING").length}
          />

          <Metric label="Tables" value={tables.length} />
        </div>

        <div className="mt-8">
          <SectionWithDialog
            title="Liste des tables"
            dialogTitle="Ajouter une table"
            dialogDescription="Remplis le formulaire ci-dessous pour ajouter une table."
          >
            <NewGuestForm tables={tables} />
          </SectionWithDialog>

          <DataTable
            columns={guestColumns}
            data={guests}
            renderActions={(row) => (
              <div className="flex items-center justify-between space-x-2">
                <Button size="icon" title="Voir">
                  <Eye className="w-4 h-4" />
                </Button>

                <Button size="icon" title="Confirmer">
                  <Check className="w-4 h-4" />
                </Button>

                <Button size="icon" title="Restreindre">
                  <Ban className="w-4 h-4" />
                </Button>
              </div>
            )}
          />
        </div>

        <SectionWithDialog
          title="Liste des tables"
          dialogTitle="Ajouter une table"
          dialogDescription="Remplis le formulaire ci-dessous pour ajouter une table."
          // Optionally, you can pass a form component or children for the form
        />

        <DataTable
          columns={tablesColumns}
          data={guests}
          renderActions={(row) => (
            <div className="flex items-center justify-between space-x-2">
              <Button size="icon" title="Voir">
                <Eye className="w-4 h-4" />
              </Button>

              <Button size="icon" title="Confirmer">
                <Check className="w-4 h-4" />
              </Button>

              <Button size="icon" title="Restreindre">
                <Ban className="w-4 h-4" />
              </Button>
            </div>
          )}
        />
      </div>
    </section>
  );
}

// Définition du type extrait
type SectionWithDialogProps = {
  title: string;
  dialogTitle: string;
  dialogDescription: string;
  children?: React.ReactNode;
};

function SectionWithDialog({
  title,
  dialogTitle,
  dialogDescription,
  children,
}: Readonly<SectionWithDialogProps>) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              Ajouter
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>

              <DialogDescription>{dialogDescription}</DialogDescription>
            </DialogHeader>

            {children}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
