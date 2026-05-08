/*
  Warnings:

  - Added the required column `category` to the `Medicine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturer` to the `Medicine` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MedicineCategory" AS ENUM ('FEVER_AND_PAIN', 'DIGESTIVE_HEALTH', 'COUGH_AND_COLD', 'DIABETES_CARE', 'HEART_AND_BP', 'SKIN_CARE', 'VITAMINS', 'BABY_CARE');

-- AlterTable
ALTER TABLE "Medicine" ADD COLUMN     "category" "MedicineCategory" NOT NULL,
ADD COLUMN     "manufacturer" TEXT NOT NULL;
