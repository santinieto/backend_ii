import CustomRouter from "./custom.router.js";
import authRouter from "./api/auth.router.js";
import cartsRouter from "./api/carts.router.js";
import productsRouter from "./api/products.router.js";

class ApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.use("/auth", authRouter);
        this.use("/carts", cartsRouter);
        this.use("/products", productsRouter);
    };
}

const apiRouter = new ApiRouter().getRouter();

export default apiRouter;
