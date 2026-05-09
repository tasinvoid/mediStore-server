import express, { NextFunction, Request, Response, Router } from "express";
import { sellerController } from "./seller.controller";
import { Role, UserStatus } from "../../../generated/prisma/enums";
import { authMiddleware } from "../../utils/authMiddleware";

const router = express.Router();

// router.post(
//   "/orders",
//   authMiddleware(Role.CUSTOMER),
//   sellerController.manageMedicine,
// );
export const sellerRouter: Router = router;
