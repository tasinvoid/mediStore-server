import { MedicineCategory } from "@prisma/client";
export declare const shopService: {
    getAllMedicinesDB: ({ searchString, category, price, manufacturer, page, limit, skip, sortBy, sortOrder, }: {
        searchString: string | "";
        category: MedicineCategory | undefined;
        price: number | undefined;
        manufacturer: string | undefined;
        page: number;
        limit: number;
        skip: number;
        sortBy: string;
        sortOrder: string;
    }) => Promise<{
        data: {
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
        }[];
        pagination: {
            page: number;
            limit: number;
            skip: number;
            sortBy: string;
            sortOrder: string;
            total: number;
        };
    }>;
    getMedicineByIdDB: ({ medicineId }: {
        medicineId: string;
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
};
//# sourceMappingURL=shop.service.d.ts.map