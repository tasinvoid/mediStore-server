import express, { NextFunction, Request, Response, Router } from "express";
import { sellerController } from "./seller.controller";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import { authMiddleware } from "../../utils/authMiddleware";

const router = express.Router();
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

router.post(
  "/medicines",
  authMiddleware(Role.SELLER),
  sellerController.manageMedicine,
);
router.patch(
  "/medicines/:id",
  authMiddleware(Role.SELLER),
  sellerController.updateMedicine,
);


router.delete(
  "/medicines/:id",
  authMiddleware(Role.SELLER),
  sellerController.deleteMedicine,
);
router.get('/dashboard',authMiddleware(Role.SELLER),sellerController.dashboard)
router.get('/orders',authMiddleware(Role.SELLER),sellerController.getSellerOrders)
router.patch('/orders',authMiddleware(Role.SELLER),sellerController.updateOrderStatus)
export const sellerRouter: Router = router;
