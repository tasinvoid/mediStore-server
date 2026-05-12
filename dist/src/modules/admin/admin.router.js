import express from "express";
import { Role } from "@prisma/client";
import { authMiddleware } from "../../utils/authMiddleware";
import { adminController } from "./admin.controller";
const router = express.Router();
router.get("/users", authMiddleware(Role.ADMIN), adminController.getAllUsers);
router.patch("/users/:id", authMiddleware(Role.ADMIN), adminController.updateUserStatus);
export const adminRouter = router;
//# sourceMappingURL=admin.router.js.map