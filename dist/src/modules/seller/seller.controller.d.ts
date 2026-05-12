import { NextFunction, Request, Response } from "express";
export declare const sellerController: {
    manageMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteMedicine: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    updateOrderStatus: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getSellerOrders: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    dashboard: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=seller.controller.d.ts.map