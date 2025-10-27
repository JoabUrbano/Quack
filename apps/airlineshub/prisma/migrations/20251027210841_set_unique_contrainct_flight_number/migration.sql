/*
  Warnings:

  - A unique constraint covering the columns `[flightNumber]` on the table `Flight` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Flight_flightNumber_key" ON "Flight"("flightNumber");
