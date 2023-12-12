/*
  Warnings:

  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `receiverName` on the `Order` table. All the data in the column will be lost.
  - The primary key for the `UserOrder` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mass` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mass` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrder" DROP CONSTRAINT "UserOrder_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
DROP COLUMN "address",
DROP COLUMN "phoneNumber",
DROP COLUMN "receiverName",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Order_id_seq";

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "mass" INTEGER NOT NULL,
ALTER COLUMN "orderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "mass" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserOrder" DROP CONSTRAINT "UserOrder_pkey",
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserOrder_pkey" PRIMARY KEY ("userId", "orderId");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "hubPointId" TEXT,
ADD COLUMN     "transactionPointId" TEXT;

-- CreateTable
CREATE TABLE "InforOder" (
    "id" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "senderNumber" TEXT NOT NULL,
    "senderAddress" TEXT NOT NULL,
    "senderPostCode" TEXT NOT NULL,
    "receiverName" TEXT NOT NULL,
    "receiverNumber" TEXT NOT NULL,
    "receiverAddress" TEXT NOT NULL,
    "receiverPostCode" TEXT NOT NULL,
    "mass" TEXT NOT NULL,
    "typeGoods" TEXT NOT NULL,
    "baseFee" INTEGER NOT NULL,
    "additionalFee" INTEGER NOT NULL,
    "VAT" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "Othercharge" INTEGER NOT NULL,
    "reveiverCOD" INTEGER NOT NULL,
    "reveicerOthercharge" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "TransactionPoint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "numberPhone" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "quanityTransaction" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "HubPoint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "numberPhone" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "quanityTransaction" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Road" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "roadPlan" TEXT NOT NULL,
    "roadRealTime" TEXT NOT NULL,
    "locationPointId" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Road_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderRoad" (
    "id" SERIAL NOT NULL,
    "orderId" TEXT NOT NULL,
    "roadId" INTEGER NOT NULL,

    CONSTRAINT "OrderRoad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InforOder_id_key" ON "InforOder"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TransactionPoint_id_key" ON "TransactionPoint"("id");

-- CreateIndex
CREATE UNIQUE INDEX "HubPoint_id_key" ON "HubPoint"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_id_key" ON "Order"("id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_transactionPointId_fkey" FOREIGN KEY ("transactionPointId") REFERENCES "TransactionPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_hubPointId_fkey" FOREIGN KEY ("hubPointId") REFERENCES "HubPoint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InforOder" ADD CONSTRAINT "InforOder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderRoad" ADD CONSTRAINT "OrderRoad_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderRoad" ADD CONSTRAINT "OrderRoad_roadId_fkey" FOREIGN KEY ("roadId") REFERENCES "Road"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
