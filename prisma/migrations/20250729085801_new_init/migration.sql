/*
  Warnings:

  - You are about to drop the column `eventId` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_eventId_fkey";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "eventId";

-- DropTable
DROP TABLE "Event";
