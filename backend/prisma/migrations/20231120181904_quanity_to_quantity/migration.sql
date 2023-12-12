/*
  Warnings:

  - You are about to drop the column `quanityHub` on the `HubPoint` table. All the data in the column will be lost.
  - You are about to drop the column `quanityTransaction` on the `TransactionPoint` table. All the data in the column will be lost.
  - Added the required column `quantityHub` to the `HubPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityTransaction` to the `TransactionPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HubPoint"
RENAME COLUMN "quanityHub" TO "quantityHub";

-- AlterTable
ALTER TABLE "TransactionPoint"
RENAME COLUMN "quanityTransaction" TO "quantityTransaction";
