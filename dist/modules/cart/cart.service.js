import { prisma } from "../../lib/prisma.js";
const addItemsToCartDB = async ({ userId, medicineId, quantity, }) => {
    const price = await prisma.medicine.findUnique({
        where: {
            id: medicineId
        },
        select: {
            price: true
        }
    });
    console.log(price);
    const data = await prisma.cartItems.create({
        data: {
            userId,
            medicineId,
            quantity,
            price: price?.price,
        },
    });
    return data;
};
const getAllCartItemsDB = async ({ userId }) => {
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
const addCartItemsToOrderDB = async ({ userId, address, }) => {
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
                        stock: true
                    },
                },
            },
        });
        if (cartItems.length === 0) {
            throw new Error("No items in cart");
        }
        for (const item of cartItems) {
            if (item.medicine.stock < item.quantity) {
                throw new Error(`${item.medicine.name} is not available on this quantity`);
            }
            await tx.medicine.update({
                where: {
                    id: item.medicineId
                },
                data: {
                    stock: {
                        decrement: item.quantity
                    }
                }
            });
        }
        const totalPrice = cartItems.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
        const newOrder = await tx.order.create({
            data: {
                customerId: userId,
                address,
                totalPrice,
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
//# sourceMappingURL=cart.service.js.map