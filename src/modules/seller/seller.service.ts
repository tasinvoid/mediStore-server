import { MedicineCategory, OrderStatus } from "@prisma/client";
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
  return res;
};
const updateMedicineDB = async (
  medicineId: string,
  sellerId: string,
  updateData: {
    name?: string;
    price?: number;
    stock?: number;
    description?: string;
    manufacturer?: string;
    category?: MedicineCategory;
  },
) => {
  const res = await prisma.medicine.update({
    where: {
      id: medicineId,
      sellerId: sellerId,
    },
    data: updateData,
  });
  return res;
};

const deleteMedicineDB = async (medicineId: string, sellerId: string) => {
  const res = await prisma.medicine.delete({
    where: {
      id: medicineId,
      sellerId: sellerId,
    },
  });
  return res;
};
const getSellerOrdersDB = async ({ sellerId }: { sellerId: string }) => {
  const data = await prisma.order.findMany({
    where: {
      items: {
        some: {
          medicine: {
            sellerId,
          },
        },
      },
    },
    select: {
      id: true,
      customerId: true,
      totalPrice: true,
      address: true,
      orderStatus: true,
      items: {
        select: {
          medicine: {
            select: {
              name: true,
            },
          },
          quantity: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
const updateOrderStatus = async ({
  orderId,
  orderStatus,
}: {
  orderId: string;
  orderStatus: OrderStatus;
}) => {
  const data = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      orderStatus: orderStatus,
    },
  });
  return data;
};
const dashboardDB = async ({ sellerId }:{sellerId:string}) => {
  const result = await prisma.$transaction(async (tx) => {
    const totalOrders = await tx.user.findUnique({
      where: {
        id: sellerId,
      },
      include: {
        orders: {
          select: {
            _count: true,
          },
        },
      },
    });
    const orderCountByGroup = await tx.order.groupBy({
      by: ["orderStatus"],
      where: {
        items: {
          some: {
            medicine: {
              sellerId,
            },
          },
        },
      },
      _count:{id:true}
    });
    const salesData = await tx.orderItems.findMany({
      where: {
        medicine: {
          sellerId,
        },
        order: {
          orderStatus: OrderStatus.SHIPPED,
        },
      },
      select: {
        quantity: true,
        medicine: {
          select: {
            price: true,
          },
        },
      },
    });
    const totalSales = salesData.reduce((sum, singleData) => {
      return sum + singleData.medicine.price * singleData.quantity;
    }, 0);
    const numberOfCustomers = await tx.order.groupBy({
      by: ["customerId"],
      where: {
        items: {
          some: {
            medicine: {
              sellerId,
            },
          },
        },
      },
    });
    const salesByMedicineCategory = await tx.medicine.groupBy({
      by: ['category'],
      where: {
        sellerId,
        orderItems: {
          some: {
            order: {
              orderStatus:"SHIPPED"
            }
          }
        }
      },
      _count:{id:true}
    })
    return {totalOrders,orderCountByGroup,salesData,totalSales,numberOfCustomers,salesByMedicineCategory}
  });
  return result
};

export const sellerService = {
  manageMedicineDB,
  updateMedicineDB,
  deleteMedicineDB,
  updateOrderStatus,
  getSellerOrdersDB,
  dashboardDB
};
