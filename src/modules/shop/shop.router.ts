import express, { Router } from "express"
import { shopController } from "./shop.controller.js"
 const router = express.Router()
router.get('/', shopController.getAllMedicines)
router.get('/:id',shopController.getMedicineById)
 export const shopRouter:Router = router