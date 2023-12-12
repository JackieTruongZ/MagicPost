/*
  Warnings:

  - You are about to drop the column `quanityTransaction` on the `HubPoint` table. All the data in the column will be lost.
  - Added the required column `quanityHub` to the `HubPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HubPoint" DROP COLUMN "quanityTransaction",
ADD COLUMN     "quanityHub" INTEGER NOT NULL;
