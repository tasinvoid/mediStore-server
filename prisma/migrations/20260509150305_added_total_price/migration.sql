-- AlterTable
ALTER TABLE "CartItems" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "totalPrice" INTEGER NOT NULL DEFAULT 0;
