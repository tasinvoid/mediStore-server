import { cartService } from "./cart.service";
const addItemsToCart = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const medicineId = req.query.medicineId;
        const quantity = parseInt(req.query.quantity);
        console.log(medicineId, quantity);
        const data = await cartService.addItemsToCartDB({
            userId,
            medicineId,
            quantity,
        });
        res.status(200).send({ data, error: null });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const getAllCartItems = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const data = await cartService.getAllCartItemsDB({ userId });
        if (!data) {
            res.status(200).send({ data: null, error: "Cart is empty" });
        }
        res.status(200).send({ data, error: null });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
const addCartItemsToOrder = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const address = req.body.address;
        const data = await cartService.addCartItemsToOrderDB({ userId, address });
        res.status(200).json({
            error: null,
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
};
export const cartController = {
    addItemsToCart,
    getAllCartItems,
    addCartItemsToOrder,
};
//# sourceMappingURL=cart.controller.js.map