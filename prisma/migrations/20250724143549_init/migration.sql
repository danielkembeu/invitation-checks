-- CreateEnum
CREATE TYPE "GuestStatus" AS ENUM ('CONFIRMED', 'WAITING', 'ABSENT', 'PRESENT');

-- CreateTable
CREATE TABLE "Table" (
    "id" TEXT NOT NULL,
    "tableNumber" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "GuestStatus" NOT NULL DEFAULT 'WAITING',
    "tableId" TEXT NOT NULL,
    "seatNumber" INTEGER NOT NULL,
    "code" CHAR(6) NOT NULL,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guest_code_key" ON "Guest"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_tableId_seatNumber_key" ON "Guest"("tableId", "seatNumber");

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
