-- DropForeignKey
ALTER TABLE "CartItems" DROP CONSTRAINT "CartItems_medicineId_fkey";

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
