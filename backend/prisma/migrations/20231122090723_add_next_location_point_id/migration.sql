/*
  Warnings:

  - Added the required column `nextLocationPointId` to the `Road` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Road" ADD COLUMN     "nextLocationPointId" TEXT NOT NULL;
