import express from "express";
import { shopRouter } from "./modules/shop/shop.router";
import { sellerRouter } from "./modules/seller/seller.router";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { cartRouter } from "./modules/cart/cart.router";
import { ordersRouter } from "./modules/orders/order.router";
import { profileRouter } from "./modules/profile/profile.router";
import { adminRouter } from "./modules/admin/admin.router";
import { errorHandler } from "./utils/globalErrorHandler";
import notFound from "./utils/notFound";
export const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use('/seller', sellerRouter);
app.use('/shop', shopRouter);
app.use('/cart', cartRouter);
app.use('/orders', ordersRouter);
app.use('/profile', profileRouter);
app.use('/admin', adminRouter);
app.use(errorHandler);
app.use(notFound);
//# sourceMappingURL=app.js.map