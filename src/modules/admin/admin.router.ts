import express, { NextFunction, Request, Response, Router } from "express";

import { Role, UserStatus } from "@prisma/client";
import { authMiddleware } from "../../utils/authMiddleware.js";
import { adminController } from "./admin.controller.js";


const router = express.Router();

router.get("/users", authMiddleware(Role.ADMIN), adminController.getAllUsers);
router.patch("/users/:id", authMiddleware(Role.ADMIN), adminController.updateUserStatus);

export const adminRouter: Router = router;