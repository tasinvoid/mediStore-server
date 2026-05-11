import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAllUsersDB = async ({
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const result = await prisma.$transaction(async (tx) => {
    const paginationData = {
      take: limit,
      skip,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: { _count: true },
    };
    const activeSellerData = await tx.user.findMany({
      where: {
        roles: "SELLER",
        status: "ACTIVE",
      },
      ...paginationData,
    });
    const bannedSellerData = await tx.user.findMany({
      where: {
        roles: "SELLER",
        status: "BANNED",
      },
      ...paginationData,
    });
    const activeCustomerData = await tx.user.findMany({
      where: {
        roles: "CUSTOMER",
        status: "ACTIVE",
      },
      ...paginationData,
    });
    const bannedCustomerData = await tx.user.findMany({
      where: {
        roles: "CUSTOMER",
        status: "BANNED",
      },
      ...paginationData,
    });
    const totalActiveCustomers = await tx.user.count({
      where: {
        roles: "CUSTOMER",
        status: "ACTIVE",
      },
    });
    const totalActiveSellers = await tx.user.count({
      where: {
        roles: "SELLER",
        status: "ACTIVE",
      },
    });
    return {
      activeCustomerData,
      bannedCustomerData,
      activeSellerData,
      bannedSellerData,
      totalActiveSellers,
      totalActiveCustomers,
    };
  });

  return result;
};
const updateUserStatusDB = async ({
  id,
  userStatus,
}: {
  id: string;
  userStatus: UserStatus;
}) => {
  const data = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status: userStatus,
    },
  });
  return data;
};
export const adminService = { getAllUsersDB, updateUserStatusDB };
