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
export const sellerRouter: Router = router;
