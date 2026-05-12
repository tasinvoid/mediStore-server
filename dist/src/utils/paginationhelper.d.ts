import { Request } from "express";
interface IPaginationOptions {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
}
export declare const paginationHelper: (req: Request) => IPaginationOptions;
export {};
//# sourceMappingURL=paginationhelper.d.ts.map