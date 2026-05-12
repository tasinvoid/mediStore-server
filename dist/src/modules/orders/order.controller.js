import { ordersService } from "./order.service";
const getOrdersHistory = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const data = await ordersService.getOrdersHistoryDB({ userId });
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
    }
    catch (error) {
        next(error);
    }
};
const getOrderById = async (req, res, next) => {
    try {
        // Destructure or get params here
        const orderId = req.params.id;
        const data = await ordersService.getOrderByIdDB({ orderId });
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
    }
    catch (error) {
        next(error);
    }
};
const cancelOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const userId = req.user?.id;
        const data = await ordersService.cancelOrderDB({ userId, orderId });
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
    }
    catch (error) {
        next(error);
    }
};
export const ordersController = {
    getOrdersHistory,
    getOrderById,
    cancelOrder,
};
//# sourceMappingURL=order.controller.js.map