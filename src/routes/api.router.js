import { Router } from "express";
import authRouter from "./api/auth.router.js";
import cartsRouter from "./api/carts.router.js";
import productsRouter from "./api/products.router.js";

const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/products", productsRouter);

export default apiRouter;
