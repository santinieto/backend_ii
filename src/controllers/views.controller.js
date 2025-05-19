import { cartsManager } from "../data/dao.factory.js";
import { productsManager } from "../data/dao.factory.js";

export const home = async (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const register = async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const verifyAccount = async (req, res) => {
    try {
        res.render("verify_account");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const login = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const logout = async (req, res) => {
    try {
        res.render("logout");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const profile = async (req, res) => {
    try {
        res.render("profile");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const controlPanel = async (req, res) => {
    try {
        res.render("control_panel");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const allProducts = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const addProduct = async (req, res) => {
    try {
        res.render("add_product");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const updateProduct = async (req, res) => {
    try {
        res.render("update_product");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const deleteProduct = async (req, res) => {
    try {
        res.render("delete_product");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const productInfo = async (req, res) => {
    try {
        const product = await productsManager.readById({
            _id: req.params.pid,
        });

        if (!product) {
            res.status(404).render("error");
        }

        res.render("product_detail", { product });
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const cartInfo = async (req, res) => {
    try {
        const cart = await cartsManager.readById({ _id: req.params.cid });

        if (!cart) {
            res.status(404).render("error");
        }

        res.render("cart_detail", { cart });
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};
