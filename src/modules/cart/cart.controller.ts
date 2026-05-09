import { NextFunction, Request, Response } from "express";
import { error } from "node:console";
import { cartService } from "./cart.service";
import { prisma } from "../../lib/prisma";

const addItemsToCart = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const medicineId = req.query.medicineId as string;
    const quantity = parseInt(req.query.quantity as string);
    console.log(medicineId, quantity);
    const data = await cartService.addItemsToCartDB({
      userId,
      medicineId,
      quantity,
    });
    res.status(200).send({ data, error: null });
  } catch (error) {
    console.log(error);
    res.status(400).send({ data: null, error });
  }
};
const getAllCartItems = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const data = await cartService.getAllCartItemsDB({ userId });
    if (!data) {
      res.status(200).send({ data: null, error: "Cart is empty" });
    }
    res.status(200).send({ data, error: null });
  } catch (error) {
    console.log(error);
    res.status(400).send({ data: null, error });
  }
};
const addCartItemsToOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    
    const userId = req.user?.id as string;
    const  address = req.body.address as string;
    const data = await cartService.addCartItemsToOrderDB({ userId, address });

    res.status(200).json({
      error: null,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
export const cartController = {
  addItemsToCart,
  getAllCartItems,
  addCartItemsToOrder,
};
