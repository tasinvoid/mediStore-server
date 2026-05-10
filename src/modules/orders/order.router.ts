import express, {  Router } from "express";

import { Role, UserStatus } from "../../../generated/prisma/enums";
import { authMiddleware } from "../../utils/authMiddleware";
import { ordersController } from "./order.controller";

const router = express.Router();

router.get(
  "/",
  authMiddleware(Role.CUSTOMER),
  ordersController.getOrdersHistory
);
router.get('/:id',authMiddleware(Role.CUSTOMER),ordersController.getOrderById)
export const ordersRouter: Router = router;
