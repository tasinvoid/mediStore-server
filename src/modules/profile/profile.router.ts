import express, {  Router } from "express";

import { Role, UserStatus } from "../../../generated/prisma/enums";
import { authMiddleware } from "../../utils/authMiddleware";
import { profileController } from "./profile.controller";


const router = express.Router();

router.get("/", authMiddleware(Role.CUSTOMER), profileController.getProfile);
router.patch("/edit", authMiddleware(Role.CUSTOMER), profileController.updateProfile);

export const profileRouter: Router = router;