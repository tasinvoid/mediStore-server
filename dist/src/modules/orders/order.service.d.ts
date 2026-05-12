export declare const ordersService: {
    getOrdersHistoryDB: ({ userId }: {
        userId: string;
    }) => Promise<({
        items: {
            medicine: {
                price: number;
                name: string;
            };
            quantity: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        totalPrice: number;
        address: string;
    })[]>;
    getOrderByIdDB: ({ orderId }: {
        orderId: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        totalPrice: number;
        address: string;
    } | null>;
    cancelOrderDB: ({ userId, orderId, }: {
        userId: string;
        orderId: string;
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
//# sourceMappingURL=order.service.d.ts.map