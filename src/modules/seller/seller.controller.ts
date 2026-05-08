import { Request, Response } from "express";
import { sellerService } from "./seller.service";
import { auth } from "../../lib/auth";

const manageMedicine = async (req: Request, res: Response) => {
  try {
    const session = req.user
    console.log(session);
    const {
      name,
      price,
      stock,
      description,
      manufacturer,
      category,
    } = req.body;
    const sellerId = req.user?.id
    const data = await sellerService.manageMedicineDB(
      name,
      price,
      stock,
      description,
      sellerId as string,
      manufacturer,
      category,
    );
    res.status(200).send({ data, error: null });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: error,
      data: null,
    });
  }
};
export const sellerController = { manageMedicine };
