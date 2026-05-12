export declare const cartService: {
    addItemsToCartDB: ({ userId, medicineId, quantity, }: {
        userId: string;
        medicineId: string;
        quantity: number;
    }) => Promise<{
        price: number;
        medicineId: string;
        id: string;
        quantity: number;
        userId: string;
    }>;
    getAllCartItemsDB: ({ userId }: {
        userId: string;
    }) => Promise<"not valid user" | ({
        medicine: {
            category: import("@prisma/client").$Enums.MedicineCategory;
            price: number;
            manufacturer: string;
            name: string;
            description: string;
            sellerId: string;
        };
    } & {
        price: number;
        medicineId: string;
        id: string;
        quantity: number;
        userId: string;
    })[]>;
    addCartItemsToOrderDB: ({ userId, address, }: {
        userId: string;
        address: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        totalPrice: number;
        address: string;
    }>;
};
//# sourceMappingURL=cart.service.d.ts.map