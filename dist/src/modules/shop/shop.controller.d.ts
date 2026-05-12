import { NextFunction, Request, Response } from "express";
export declare const shopController: {
    getAllMedicines: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getMedicineById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=shop.controller.d.ts.map