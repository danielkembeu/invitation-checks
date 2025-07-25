import { Metric } from "@/components/board/Overview";
import { prisma } from "@/db";
import { Users, Layout, UserCheck2, BookUser, UserMinus2 } from "lucide-react";
import { GuestStatus } from "@/generated/prisma";
import { GuestTable } from "@/components/board/GuestTable";
import { TablesTable } from "@/components/board/TablesTable";
import { Fragment } from "react";
import { Navbar } from "@/components/Navbar";

async function getTables() {
  return await prisma.table.findMany({
    include: { guests: true },
  });
}

async function getGuests() {
  return await prisma.guest.findMany({ orderBy: { updatedAt: "desc" } });
}

export default async function Dashboard() {
  const guests = await getGuests();
  const tables = await getTables();

  return (
    <Fragment>
      <Navbar />

      <div className="px-4 md:px-28 lg:px-60 xl:px-96 py-4 md:py-12 lg:py-20">
        <h2 className="text-xl font-bold mb-4">Gestion des invités</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <Metric
            label="Nombre total d'invités"
            value={guests.length}
            labelColor="text-gray-600"
            iconColor="text-gray-600 bg-gray-600/20"
            contentColors="bg-gray-600/10 text-gray-600 border-gray-600"
            icon={<BookUser />}
          />

          <Metric
            label="Invités confirmés"
            labelColor="text-green-600"
            iconColor="text-green-600 bg-green-600/20"
            contentColors="bg-green-600/10 text-green-600 border-green-600"
            icon={<UserCheck2 />}
            value={
              guests.filter((g) => g.status === GuestStatus.CONFIRMED).length
            }
          />

          <Metric
            label="Invités en attente"
            labelColor="text-yellow-600"
            iconColor="text-yellow-600 bg-yellow-600/20"
            contentColors="bg-yellow-600/10 text-yellow-600 border-yellow-600"
            icon={<Users />}
            value={
              guests.filter((g) => g.status === GuestStatus.WAITING).length
            }
          />

          <Metric
            label="Invités absents"
            labelColor="text-red-600"
            iconColor="text-red-600 bg-red-600/20"
            contentColors="bg-red-600/10 text-red-600 border-red-600"
            icon={<UserMinus2 />}
            value={guests.filter((g) => g.status === GuestStatus.ABSENT).length}
          />

          {/* Tables */}

          <Metric label="Les Tables" value={tables.length} icon={<Layout />} />

          <Metric
            label="Les Tables pleines"
            labelColor="text-red-600"
            iconColor="text-red-600 bg-red-600/20"
            contentColors="bg-red-600/10 text-red-600 border-red-600"
            value={tables.filter((t) => t.guests.length >= t.capacity).length}
            icon={<Layout />}
          />

          <Metric
            label="Les Tables disponibles"
            labelColor="text-green-600"
            iconColor="text-green-600 bg-green-600/20"
            contentColors="bg-green-600/10 text-green-600 border-green-600"
            value={tables.filter((t) => t.capacity > t.guests.length).length}
            icon={<Layout />}
          />
        </div>

        <GuestTable guests={guests} tables={tables} />
        <TablesTable tables={tables} />
      </div>
    </Fragment>
  );
}
