import CustomRouter from "./custom.router.js";
import { cartsManager } from "../data/managers/carts.mongo.js";
import { productsManager } from "../data/managers/products.mongo.js";

const home = async (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

const register = async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

const login = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

const logout = async (req, res) => {
    try {
        res.render("logout");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

const profile = async (req, res) => {
    try {
        res.render("profile");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

const controlPanel = async (req, res) => {
    try {
        res.render("control_panel");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

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
    };
}

const viewsRouter = new ViewsRouter().getRouter();

viewsRouter.get("/products", async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || "asc";

    // Extraer solo los IDs de los carritos
    const carts = await cartsManager.readAll();
    if (!carts) {
        res.status(404).render("error");
    }
    const cartIds = carts.map((cart) => cart._id);

    const products = await productsManager.getPaginatedProducts(
        page,
        limit,
        sort
    );

    res.render("products", { products, cartIds });
});

viewsRouter.get("/products/:pid", async (req, res) => {
    console.log("Llamada con productId", req.params.pid);

    const product = await productsManager.readById({
        _id: req.params.pid,
    });

    if (!product) {
        res.status(404).render("error");
    }

    res.render("product_detail", { product });
});

viewsRouter.get("/carts/:cid", async (req, res) => {
    const cart = await cartsManager.readById({ _id: req.params.cid });

    if (!cart) {
        res.status(404).render("error");
    }

    res.render("cart_detail", { cart });
});

export default viewsRouter;
