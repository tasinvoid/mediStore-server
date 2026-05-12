import { MedicineCategory, OrderStatus } from "@prisma/client";
export declare const sellerService: {
    manageMedicineDB: (name: string, price: number, stock: number, description: string, sellerId: string, manufacturer: string, category: MedicineCategory) => Promise<{
        category: import("@prisma/client").$Enums.MedicineCategory;
        price: number;
        manufacturer: string;
        id: string;
        name: string;
        stock: number;
        description: string;
        sellerId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateMedicineDB: (medicineId: string, sellerId: string, updateData: {
        name?: string;
        price?: number;
        stock?: number;
        description?: string;
        manufacturer?: string;
        category?: MedicineCategory;
    }) => Promise<{
        category: import("@prisma/client").$Enums.MedicineCategory;
        price: number;
        manufacturer: string;
        id: string;
        name: string;
        stock: number;
        description: string;
        sellerId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteMedicineDB: (medicineId: string, sellerId: string) => Promise<{
        category: import("@prisma/client").$Enums.MedicineCategory;
        price: number;
        manufacturer: string;
        id: string;
        name: string;
        stock: number;
        description: string;
        sellerId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateOrderStatus: ({ orderId, orderStatus, }: {
        orderId: string;
        orderStatus: OrderStatus;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        totalPrice: number;
        address: string;
    }>;
    getSellerOrdersDB: ({ sellerId }: {
        sellerId: string;
    }) => Promise<{
        id: string;
        orderStatus: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        totalPrice: number;
        address: string;
        items: {
            medicine: {
                name: string;
            };
            quantity: number;
        }[];
    }[]>;
    dashboardDB: ({ sellerId }: {
        sellerId: string;
    }) => Promise<{
        totalOrders: ({
            orders: {
                _count: {
                    customer: number;
                    items: number;
                };
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            roles: import("@prisma/client").$Enums.Role;
            status: import("@prisma/client").$Enums.UserStatus;
            image: string | null;
        }) | null;
        orderCountByGroup: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.OrderGroupByOutputType, "orderStatus"[]> & {
            _count: {
                id: number;
            };
        })[];
        salesData: {
            medicine: {
                price: number;
            };
            quantity: number;
        }[];
        totalSales: number;
        numberOfCustomers: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.OrderGroupByOutputType, "customerId"[]> & {})[];
        salesByMedicineCategory: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.MedicineGroupByOutputType, "category"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
};
//# sourceMappingURL=seller.service.d.ts.map