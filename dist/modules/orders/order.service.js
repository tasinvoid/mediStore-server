import { prisma } from "../../lib/prisma.js";
const getOrdersHistoryDB = async ({ userId }) => {
    const data = await prisma.order.findMany({
        where: {
            customerId: userId,
        },
        include: {
            items: {
                select: {
                    medicine: {
                        select: {
                            name: true,
                            price: true,
                        },
                    },
                    quantity: true,
                },
            },
        },
    });
    return data;
};
const cancelOrderDB = async ({ userId, orderId, }) => {
    const data = await prisma.order.delete({
        where: {
            id: orderId,
            customerId: userId,
            orderStatus: "PENDING",
        },
    });
    return data;
};
const getOrderByIdDB = async ({ orderId }) => {
    const data = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
    });
    return data;
};
export const ordersService = { getOrdersHistoryDB, getOrderByIdDB, cancelOrderDB };
//# sourceMappingURL=order.service.js.map