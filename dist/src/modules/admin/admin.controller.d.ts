import { NextFunction, Request, Response } from "express";
export declare const adminController: {
    getAllUsers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateUserStatus: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=admin.controller.d.ts.map