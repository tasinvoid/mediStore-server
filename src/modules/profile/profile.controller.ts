import { NextFunction, Request, Response } from "express";
import { profileService } from "./profile.service";

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Destructure or get params here
    const userId = req.user?.id as string;
    const data = await profileService.getProfileDB({ userId });

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return res.status(404).json({
        data: null,
        error: "Resource not found",
      });
    }

    res.status(200).json({
      error: null,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Destructure or get params here
    const userId = req.user?.id as string;
    const { name, image } = req.body;
    const data = await profileService.updateProfileDB({ userId, name, image });

    res.status(200).json({
      error: null,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};
export const profileController = {
    getProfile,updateProfile
}
