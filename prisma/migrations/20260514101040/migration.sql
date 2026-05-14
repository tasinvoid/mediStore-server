/*
  Warnings:

  - A unique constraint covering the columns `[customerId,medicineId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customerId,sellerId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_sellerId_fkey";

-- AlterTable
ALTER TABLE "Reviews" ADD COLUMN     "medicineId" TEXT,
ALTER COLUMN "sellerId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_customerId_medicineId_key" ON "Reviews"("customerId", "medicineId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_customerId_sellerId_key" ON "Reviews"("customerId", "sellerId");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
