import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
export declare const authMiddleware: (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=authMiddleware.d.ts.map