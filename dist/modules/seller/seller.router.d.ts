import { Router } from "express";
import { Role, UserStatus } from "@prisma/client";
declare global {
    namespace Express {
        interface Request {
            user?: {
                name: string;
                email: string;
                emailVerified: boolean;
                roles: Role;
                status: UserStatus;
                id: string;
            };
        }
    }
}
export declare const sellerRouter: Router;
//# sourceMappingURL=seller.router.d.ts.map