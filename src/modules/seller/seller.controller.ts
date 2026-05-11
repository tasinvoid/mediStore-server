import { NextFunction, Request, Response } from "express";
import { sellerService } from "./seller.service";
import { OrderStatus } from "../../../generated/prisma/enums";

const manageMedicine = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { name, price, stock, description, manufacturer, category } =
      req.body;
    const sellerId = req.user?.id;

    const data = await sellerService.manageMedicineDB(
      name,
      Number(price),
      Number(stock),
      description,
      sellerId as string,
      manufacturer,
      category,
    );
    res.status(200).send({ data, error: null });
  } catch (error) {
    next(error);
  }
};

const updateMedicine = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = req.params.id as string;
    const sellerId = req.user?.id;
    const updateData = req.body;

    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.stock) updateData.stock = Number(updateData.stock);

    const data = await sellerService.updateMedicineDB(
      id,
      sellerId as string,
      updateData,
    );

    res.status(200).send({
      data,
      message: "Medicine updated successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
const updateOrderStatus = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { orderId, orderStatus } = req.body;

    if (!orderId || !orderStatus) {
      return res.status(400).send({
        error: "orderId and orderStatus are required",
        data: null,
      });
    }

    const data = await sellerService.updateOrderStatus({
      orderId,
      orderStatus,
    });

    res.status(200).send({
      data,
      error: null,
    });
  } catch (error: any) {
    console.error("Order Update Error:", error);
    next(error)
  }
};

const deleteMedicine = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const id = req.params.id as string;
    const sellerId = req.user?.id;

    const data = await sellerService.deleteMedicineDB(id, sellerId as string);

    res.status(200).send({
      data,
      message: "Medicine deleted successfully",
      error: null,
    });
  } catch (error) {
    next(error);
  }
};
const getSellerOrders = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const sellerId = req.user?.id as string;

    if (!sellerId) {
      return res.status(401).send({
        error: "seller id is required",
        data: null,
      });
    }

    const data = await sellerService.getSellerOrdersDB({ sellerId });

    if (!data || data.length === 0) {
      return res.status(200).send({
        data: [],
        error: null,
      });
    }

    res.status(200).send({
      data,
      error: null,
    });
  } catch (error: any) {
    console.error("Seller Order Fetch Error:", error);
    next(error)
  }
};
const dashboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Destructure or get params here
    const sellerId = req.user?.id as string;
    const data = await sellerService.dashboardDB({ sellerId });

    res.status(200).json({
      error: null,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
export const sellerController = {
  manageMedicine,
  updateMedicine,
  deleteMedicine,
  updateOrderStatus,
  getSellerOrders,
  dashboard,
};
