/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserPoint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserPoint_userId_key" ON "UserPoint"("userId");
