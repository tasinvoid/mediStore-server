import express from "express";
import { sellerController } from "./seller.controller";
import { Role } from "@prisma/client";
import { authMiddleware } from "../../utils/authMiddleware";
const router = express.Router();
router.post("/medicines", authMiddleware(Role.SELLER), sellerController.manageMedicine);
router.patch("/medicines/:id", authMiddleware(Role.SELLER), sellerController.updateMedicine);
router.delete("/medicines/:id", authMiddleware(Role.SELLER), sellerController.deleteMedicine);
router.get('/dashboard', authMiddleware(Role.SELLER), sellerController.dashboard);
router.get('/orders', authMiddleware(Role.SELLER), sellerController.getSellerOrders);
router.patch('/orders', authMiddleware(Role.SELLER), sellerController.updateOrderStatus);
export const sellerRouter = router;
//# sourceMappingURL=seller.router.js.map