import { prisma } from "../../lib/prisma.js";

const getProfileDB = async ({ userId }:{userId:string}) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      roles: true,
      status: true,
    },
  });
  return data;
};
const updateProfileDB = async ({
  userId,
  name,
  image,
}: {
  userId:string;
  name:string;
  image:string;
}) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(name && { name }),
      ...(image && { image }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });
  return updatedUser;
};
export const profileService = { getProfileDB, updateProfileDB };
