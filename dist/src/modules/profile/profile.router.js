import express from "express";
import { Role } from "@prisma/client";
import { authMiddleware } from "../../utils/authMiddleware";
import { profileController } from "./profile.controller";
const router = express.Router();
router.get("/", authMiddleware(Role.CUSTOMER), profileController.getProfile);
router.patch("/edit", authMiddleware(Role.CUSTOMER), profileController.updateProfile);
export const profileRouter = router;
//# sourceMappingURL=profile.router.js.map