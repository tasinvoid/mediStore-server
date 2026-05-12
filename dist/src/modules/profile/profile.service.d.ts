export declare const profileService: {
    getProfileDB: ({ userId }: {
        userId: string;
    }) => Promise<{
        id: string;
        name: string;
        email: string;
        roles: import("@prisma/client").$Enums.Role;
        status: import("@prisma/client").$Enums.UserStatus;
        image: string | null;
    } | null>;
    updateProfileDB: ({ userId, name, image, }: {
        userId: string;
        name: string;
        image: string;
    }) => Promise<{
        id: string;
        name: string;
        email: string;
        image: string | null;
    }>;
};
//# sourceMappingURL=profile.service.d.ts.map