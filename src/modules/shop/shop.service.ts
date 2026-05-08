import { MedicineCategory } from "../../../generated/prisma/enums";
import { MedicineWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const getAllMedicinesDB = async ({
  searchString,
  category,
  price,
  manufacturer,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  searchString: string | "";
  category: MedicineCategory | undefined;
  price: number | undefined;
  manufacturer: string | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const andConditions: MedicineWhereInput | MedicineWhereInput[] = [];
  console.log(searchString, category, price, manufacturer);
  console.log(andConditions);
  if (searchString !== "") {
    andConditions.push({
      OR: [
        {
          name: {
            contains: searchString,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchString,
            mode: "insensitive",
          },
        },
      ],
    });
  }
  if (category !== undefined) {
    andConditions.push({
      category,
    });
  }
  if (manufacturer !== undefined) {
    andConditions.push({
      manufacturer,
    });
  }
  if (price !== undefined) {
    andConditions.push({
      price,
    });
  }
  const res = await prisma.medicine.findMany({
    where: {
      AND: andConditions,
    },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  return { data: res, pagination: { page, limit, skip, sortBy, sortOrder } };
};
const getMedicineByIdDB = async ({ medicineId }: { medicineId: string }) => {
  const data = await prisma.medicine.findUniqueOrThrow({
    where: {
      id: medicineId,
    },
  });
  return data;
};
export const shopService = {
  getAllMedicinesDB,
  getMedicineByIdDB,
};
