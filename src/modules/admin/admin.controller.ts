import { NextFunction, Request, Response } from "express";
import { UserStatus } from "@prisma/client";
import { adminService } from "./admin.service";
import { paginationHelper } from "../../utils/paginationhelper";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
      // Destructure or get params here
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper(req);
    const data = await adminService.getAllUsersDB({
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    res.status(200).json({
      error: null,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
      // Destructure or get params here
      const id = req.params.id as string
      const userStatus = req.body.userStatus as UserStatus
    const data = await adminService.updateUserStatusDB({id,userStatus});
    
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return res.status(404).json({
        data: null,
        error: 'Resource not found',
      });
    }
    
    res.status(200).json({
      error: null,
      data: data
    });
  } catch (error) {
    next(error);
  }
};
export const adminController = {
    getAllUsers,
    updateUserStatus
};
