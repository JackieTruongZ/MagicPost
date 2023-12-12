/*
  Warnings:

  - Added the required column `cityDistrict` to the `HubPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `HubPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityDistrict` to the `TransactionPoint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `TransactionPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HubPoint" ADD COLUMN     "cityDistrict" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TransactionPoint" ADD COLUMN     "cityDistrict" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL;
