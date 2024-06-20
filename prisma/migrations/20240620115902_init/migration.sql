/*
  Warnings:

  - Added the required column `expireAt` to the `Copon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Copon" ADD COLUMN     "expireAt" TIMESTAMP(3) NOT NULL;
