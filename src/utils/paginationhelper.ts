import { Request } from "express";
interface IPaginationOptions {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}
export const paginationHelper = (req: Request): IPaginationOptions => {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 2;
  const skip = (page - 1) * limit;
  const sortOrder = typeof req.query.sortOrder === 'string' ? req.query.sortOrder : "asc";
  const sortBy = typeof req.query.sortBy === 'string' ? req.query.sortBy : "createdAt";
  return { page, limit, skip, sortBy, sortOrder };
};
