/*
  Warnings:

  - You are about to drop the column `hubPointId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `transactionPointId` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_hubPointId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_transactionPointId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "hubPointId",
DROP COLUMN "transactionPointId";

-- CreateTable
CREATE TABLE "UserPoint" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "transId" TEXT NOT NULL,
    "hubId" TEXT NOT NULL,

    CONSTRAINT "UserPoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_transId_fkey" FOREIGN KEY ("transId") REFERENCES "TransactionPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPoint" ADD CONSTRAINT "UserPoint_hubId_fkey" FOREIGN KEY ("hubId") REFERENCES "HubPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
