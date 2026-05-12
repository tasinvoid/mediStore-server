import { NextFunction, Request, Response } from "express";
export declare const cartController: {
    addItemsToCart: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllCartItems: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    addCartItemsToOrder: (req: Request, res: Response, next: NextFunction) => Promise<void>;
};
//# sourceMappingURL=cart.controller.d.ts.map