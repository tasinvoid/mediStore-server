import { adminService } from "./admin.service.js";
import { paginationHelper } from "../../utils/paginationhelper.js";
const getAllUsers = async (req, res, next) => {
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
    }
    catch (error) {
        next(error);
    }
};
const updateUserStatus = async (req, res, next) => {
    try {
        // Destructure or get params here
        const id = req.params.id;
        const userStatus = req.body.userStatus;
        const data = await adminService.updateUserStatusDB({ id, userStatus });
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
    }
    catch (error) {
        next(error);
    }
};
export const adminController = {
    getAllUsers,
    updateUserStatus
};
//# sourceMappingURL=admin.controller.js.map