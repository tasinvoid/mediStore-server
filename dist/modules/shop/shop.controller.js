import { shopService } from "./shop.service.js";
import { MedicineCategory } from "@prisma/client";
import { paginationHelper } from "../../utils/paginationhelper.js";
const getAllMedicines = async (req, res, next) => {
    try {
        const { search } = req.query;
        const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req);
        const searchString = typeof search === "string" ? search : "";
        console.log(searchString);
        const { category, manufacturer, price } = req.query;
        const validCategory = Object.values(MedicineCategory).includes(category)
            ? category
            : undefined;
        console.log(price);
        const validPrice = typeof price === "string" ? parseInt(price) : undefined;
        const validManufacturer = typeof manufacturer === "string" ? manufacturer : undefined;
        const data = await shopService.getAllMedicinesDB({
            searchString,
            category: validCategory,
            price: validPrice,
            manufacturer: validManufacturer,
            page,
            limit,
            skip,
            sortBy,
            sortOrder,
        });
        res.status(200).send({ data, error: null });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const getMedicineById = async (req, res, next) => {
    try {
        const medicineId = req.params.id;
        if (!medicineId) {
            return res
                .status(404)
                .send({ data: null, error: "Medicine Id not found" });
        }
        const data = await shopService.getMedicineByIdDB({ medicineId });
        if (!data) {
            return res
                .status(404)
                .send({ data: null, error: "Medicine details not found" });
        }
        res.status(200).send({ data, error: null });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
export const shopController = { getAllMedicines, getMedicineById };
//# sourceMappingURL=shop.controller.js.map