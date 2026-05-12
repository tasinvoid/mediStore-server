import { sellerService } from "./seller.service.js";
const manageMedicine = async (req, res, next) => {
    try {
        const { name, price, stock, description, manufacturer, category } = req.body;
        const sellerId = req.user?.id;
        const data = await sellerService.manageMedicineDB(name, Number(price), Number(stock), description, sellerId, manufacturer, category);
        res.status(200).send({ data, error: null });
    }
    catch (error) {
        next(error);
    }
};
const updateMedicine = async (req, res, next) => {
    try {
        const id = req.params.id;
        const sellerId = req.user?.id;
        const updateData = req.body;
        if (updateData.price)
            updateData.price = Number(updateData.price);
        if (updateData.stock)
            updateData.stock = Number(updateData.stock);
        const data = await sellerService.updateMedicineDB(id, sellerId, updateData);
        res.status(200).send({
            data,
            message: "Medicine updated successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateOrderStatus = async (req, res, next) => {
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
    }
    catch (error) {
        console.error("Order Update Error:", error);
        next(error);
    }
};
const deleteMedicine = async (req, res, next) => {
    try {
        const id = req.params.id;
        const sellerId = req.user?.id;
        const data = await sellerService.deleteMedicineDB(id, sellerId);
        res.status(200).send({
            data,
            message: "Medicine deleted successfully",
            error: null,
        });
    }
    catch (error) {
        next(error);
    }
};
const getSellerOrders = async (req, res, next) => {
    try {
        const sellerId = req.user?.id;
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
    }
    catch (error) {
        console.error("Seller Order Fetch Error:", error);
        next(error);
    }
};
const dashboard = async (req, res, next) => {
    try {
        // Destructure or get params here
        const sellerId = req.user?.id;
        const data = await sellerService.dashboardDB({ sellerId });
        res.status(200).json({
            error: null,
            data: data,
        });
    }
    catch (error) {
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
//# sourceMappingURL=seller.controller.js.map