import { MedicineCategory } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const manageMedicineDB = async (
  name: string,
  price: number,
  stock: number,
  description: string,
  sellerId: string,
  manufacturer: string,
  category: MedicineCategory,
) => {
  const res = await prisma.medicine.create({
    data: {
      name,
      price,
      stock,
      description,
      sellerId,
      manufacturer,
      category,
    },
  });
  return res
};
export const sellerService = {
  manageMedicineDB
}