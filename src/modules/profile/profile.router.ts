import express, {  Router } from "express";

import { Role, UserStatus } from "@prisma/client";
import { authMiddleware } from "../../utils/authMiddleware.js";
import { profileController } from "./profile.controller.js";


const router = express.Router();

router.get("/", authMiddleware(Role.CUSTOMER), profileController.getProfile);
router.patch("/edit", authMiddleware(Role.CUSTOMER), profileController.updateProfile);

export const profileRouter: Router = router;