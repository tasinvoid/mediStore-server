import { prisma } from "../../lib/prisma";

const addItemsToCartDB = async ({
  userId,
  medicineId,
  quantity,
}: {
  userId: string;
  medicineId: string;
  quantity: number;
}) => {
  const data = await prisma.cartItems.create({
    data: {
      userId,
      medicineId,
      quantity,
    },
  });
  return data;
};
const getAllCartItemsDB = async ({ userId }: { userId: string }) => {
  const isUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!isUser) {
    return "not valid user";
  }
  const data = await prisma.cartItems.findMany({
    where: {
      userId,
    },
    include: {
      medicine: {
        select: {
          name: true,
          description: true,
          price: true,
          sellerId: true,
          manufacturer: true,
          category: true,
        },
      },
    },
  });
  return data;
};
const addCartItemsToOrderDB = async ({
  userId,
  address,
}: {
  userId: string;
  address: string;
}) => {
  const result = await prisma.$transaction(async (tx) => {
    const cartItems = await tx.cartItems.findMany({
      where: {
        userId,
      },
      include: {
        medicine: {
          select: {
            name: true,
            price: true,
            description: true,
          },
        },
      },
    });
    if (cartItems.length === 0) {
      throw new Error("No items in cart");
    }
    const newOrder = await tx.order.create({
      data: {
        customerId: userId,
        address,
        items: {
          create: cartItems.map((cartItem) => ({
            medicineId: cartItem.medicineId,
            quantity: cartItem.quantity,
          })),
        },
      },
    });
    const removeFormCart = await tx.cartItems.deleteMany({
      where: {
        userId,
      },
    });
    return newOrder;
  });
  return result;
};
export const cartService = {
  addItemsToCartDB,
  getAllCartItemsDB,
  addCartItemsToOrderDB,
};
