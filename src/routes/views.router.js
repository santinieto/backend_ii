import { Router } from "express";
import { cartsManager } from "../data/managers/carts.mongo.js";
import { productsManager } from "../data/managers/products.mongo.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
});

viewsRouter.get("/register", (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
});

viewsRouter.get("/login", (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
});

viewsRouter.get("/logout", (req, res) => {
    try {
        res.render("logout");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
});

viewsRouter.get("/profile", (req, res) => {
    try {
        res.render("profile");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
});

viewsRouter.get("/control-panel", (req, res) => {
    try {
        res.render("control_panel");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
});

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
