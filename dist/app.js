import express from "express";
import { shopRouter } from "./modules/shop/shop.router.js";
import { sellerRouter } from "./modules/seller/seller.router.js";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { cartRouter } from "./modules/cart/cart.router.js";
import { ordersRouter } from "./modules/orders/order.router.js";
import { profileRouter } from "./modules/profile/profile.router.js";
import { adminRouter } from "./modules/admin/admin.router.js";
import { errorHandler } from "./utils/globalErrorHandler.js";
import notFound from "./utils/notFound.js";
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/seller", sellerRouter);
app.use("/shop", shopRouter);
app.use("/cart", cartRouter);
app.use("/orders", ordersRouter);
app.use("/profile", profileRouter);
app.use("/admin", adminRouter);
app.use(errorHandler);
app.use(notFound);
export default app;
//# sourceMappingURL=app.js.map