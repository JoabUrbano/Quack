/*
  Warnings:

  - The primary key for the `Airline` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."Flight" DROP CONSTRAINT "Flight_airlineId_fkey";

-- AlterTable
ALTER TABLE "Airline" DROP CONSTRAINT "Airline_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Airline_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Airline_id_seq";

-- AlterTable
ALTER TABLE "Flight" ALTER COLUMN "airlineId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_airlineId_fkey" FOREIGN KEY ("airlineId") REFERENCES "Airline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
