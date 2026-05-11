import express, { NextFunction, Request, Response, Router } from "express";

import { Role, UserStatus } from "../../../generated/prisma/enums";
import { authMiddleware } from "../../utils/authMiddleware";
import { adminController } from "./admin.controller";


const router = express.Router();

router.get("/users", authMiddleware(Role.ADMIN), adminController.getAllUsers);
router.get("/users/:id", authMiddleware(Role.ADMIN), adminController.updateUserStatus);

export const adminRouter: Router = router;