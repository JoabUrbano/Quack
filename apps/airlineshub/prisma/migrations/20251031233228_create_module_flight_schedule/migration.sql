/*
  Warnings:

  - You are about to drop the column `flightId` on the `AirTicket` table. All the data in the column will be lost.
  - You are about to drop the column `expectedArrival` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `expectedDeparture` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Flight` table. All the data in the column will be lost.
  - Added the required column `flightScheduleId` to the `AirTicket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."AirTicket" DROP CONSTRAINT "AirTicket_flightId_fkey";

-- AlterTable
ALTER TABLE "AirTicket" DROP COLUMN "flightId",
ADD COLUMN     "flightScheduleId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "expectedArrival",
DROP COLUMN "expectedDeparture",
DROP COLUMN "status",
DROP COLUMN "value";

-- CreateTable
CREATE TABLE "FlightSchedule" (
    "id" TEXT NOT NULL,
    "expectedDeparture" DATE NOT NULL,
    "expectedArrival" DATE NOT NULL,
    "flightId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "status" "FlightStatus" NOT NULL DEFAULT 'SCHEDULED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlightSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AirTicket" ADD CONSTRAINT "AirTicket_flightScheduleId_fkey" FOREIGN KEY ("flightScheduleId") REFERENCES "FlightSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlightSchedule" ADD CONSTRAINT "FlightSchedule_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "Flight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
