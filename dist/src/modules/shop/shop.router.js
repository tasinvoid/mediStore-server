import express from "express";
import { shopController } from "./shop.controller";
const router = express.Router();
router.get('/', shopController.getAllMedicines);
router.get('/:id', shopController.getMedicineById);
export const shopRouter = router;
//# sourceMappingURL=shop.router.js.map