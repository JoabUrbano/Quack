/*
  Warnings:

  - Added the required column `airplaneId` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "airplaneId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Airplane" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Airplane_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
