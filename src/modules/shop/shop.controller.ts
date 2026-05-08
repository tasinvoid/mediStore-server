import { Request, Response } from "express";
import { shopService } from "./shop.service";
import { MedicineCategory } from "../../../generated/prisma/enums";
import { error } from "node:console";
import { paginationHelper } from "../../utils/paginationhelper";

const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req);
    const searchString = typeof search === "string" ? search : "";
    console.log(searchString);
    const { category, manufacturer, price } = req.query;
    const validCategory = Object.values(MedicineCategory).includes(
      category as MedicineCategory,
    )
      ? (category as MedicineCategory)
      : undefined;
    console.log(price);
    const validPrice = typeof price === "string" ? parseInt(price) : undefined;
    const validManufacturer =
      typeof manufacturer === "string" ? manufacturer : undefined;
    

   
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
  } catch (error) {
    console.log(error);
    res.status(400).send({ data: null, error });
  }
};
const getMedicineById = async (req: Request, res: Response) => {
  try {
    const medicineId = req.params.id as string;
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
  } catch (error) {
    console.log(error);
    res.status(404).send({ data: null, error });
  }
};
export const shopController = { getAllMedicines, getMedicineById };
