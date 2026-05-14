import express, { Router } from "express";

import { Role, UserStatus } from "@prisma/client";
import { authMiddleware } from "../../utils/authMiddleware.js";
import { ordersController } from "./order.controller.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware(Role.CUSTOMER),
  ordersController.getOrdersHistory,
);
router.delete(
  "/cancel/:id",
  authMiddleware(Role.CUSTOMER),
  ordersController.cancelOrder,
);
router.get(
  "/:id",
  authMiddleware(Role.CUSTOMER),
  ordersController.getOrderById,
);


export const ordersRouter: Router = router;
