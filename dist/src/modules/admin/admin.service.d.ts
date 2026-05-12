import { UserStatus } from "@prisma/client";
export declare const adminService: {
    getAllUsersDB: ({ page, limit, skip, sortBy, sortOrder, }: {
        page: number;
        limit: number;
        skip: number;
        sortBy: string;
        sortOrder: string;
    }) => Promise<{
        activeCustomerData: ({
            _count: {
                orders: number;
                medicines: number;
                reviews: number;
                cartItems: number;
                sessions: number;
                accounts: number;
            };
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
        })[];
        bannedCustomerData: ({
            _count: {
                orders: number;
                medicines: number;
                reviews: number;
                cartItems: number;
                sessions: number;
                accounts: number;
            };
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
        })[];
        activeSellerData: ({
            _count: {
                orders: number;
                medicines: number;
                reviews: number;
                cartItems: number;
                sessions: number;
                accounts: number;
            };
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
        })[];
        bannedSellerData: ({
            _count: {
                orders: number;
                medicines: number;
                reviews: number;
                cartItems: number;
                sessions: number;
                accounts: number;
            };
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
        })[];
        totalActiveSellers: number;
        totalActiveCustomers: number;
    }>;
    updateUserStatusDB: ({ id, userStatus, }: {
        id: string;
        userStatus: UserStatus;
    }) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        roles: import("@prisma/client").$Enums.Role;
        status: import("@prisma/client").$Enums.UserStatus;
        image: string | null;
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map