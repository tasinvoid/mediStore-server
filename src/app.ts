import express, { Application } from "express"
import { shopRouter } from "./modules/shop/shop.router"
import { sellerRouter } from "./modules/seller/seller.router"
import cors from "cors"
import { toNodeHandler } from "better-auth/node"
import { auth } from "./lib/auth"
export const app: Application = express()
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
// app.use('/shop', shopRouter)
app.use('/seller', sellerRouter)
app.use('/shop',shopRouter)