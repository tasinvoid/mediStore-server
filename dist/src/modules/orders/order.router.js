import express from "express";
import { Role } from "@prisma/client";
import { authMiddleware } from "../../utils/authMiddleware";
import { ordersController } from "./order.controller";
const router = express.Router();
router.get("/", authMiddleware(Role.CUSTOMER), ordersController.getOrdersHistory);
router.delete("/cancel/:id", authMiddleware(Role.CUSTOMER), ordersController.cancelOrder);
router.get("/:id", authMiddleware(Role.CUSTOMER), ordersController.getOrderById);
export const ordersRouter = router;
//# sourceMappingURL=order.router.js.map