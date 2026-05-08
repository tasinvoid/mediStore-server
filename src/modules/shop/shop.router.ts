import express, { Router } from "express"
import { shopController } from "./shop.controller"
 const router = express.Router()
router.get('/', shopController.getAllMedicines)
router.get('/:id',shopController.getMedicineById)
 export const shopRouter:Router = router