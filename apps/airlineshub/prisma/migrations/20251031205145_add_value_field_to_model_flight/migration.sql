/*
  Warnings:

  - Added the required column `value` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "value" INTEGER NOT NULL;
