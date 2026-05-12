import express, { NextFunction, Request, Response, Router } from "express";

import { Role, UserStatus } from "@prisma/client";
import { authMiddleware } from "../../utils/authMiddleware.js";
import { cartController } from "./cart.controller.js";

const router = express.Router();

router.post("/", authMiddleware(Role.CUSTOMER), cartController.addItemsToCart);
router.get("/", authMiddleware(Role.CUSTOMER), cartController.getAllCartItems);
router.post("/checkout",authMiddleware(Role.CUSTOMER),cartController.addCartItemsToOrder)
export const cartRouter: Router = router;
