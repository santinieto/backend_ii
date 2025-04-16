import CustomRouter from "./custom.router.js";

import {
    home,
    register,
    login,
    logout,
    profile,
    controlPanel,
    allProducts,
    addProduct,
    deleteProduct,
    updateProduct,
    productInfo,
    cartInfo,
} from "../controllers/views.controller.js"; // Importamos los controladores

class ViewsRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.read("/", [], home);
        this.read("/register", [], register);
        this.read("/login", [], login);
        this.read("/logout", [], logout);
        this.read("/profile", [], profile);
        this.read("/control-panel", [], controlPanel);
        this.read("/products", [], allProducts);
        this.read("/add-product", [], addProduct);
        this.read("/delete-product", [], deleteProduct);
        this.read("/update-product", [], updateProduct);
        this.read("/products/:pid", [], productInfo);
        this.read("/carts/:cid", [], cartInfo);
    };
}

const viewsRouter = new ViewsRouter().getRouter();

export default viewsRouter;
