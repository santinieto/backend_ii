import express from "express";
import { cartsManager } from "../../data/managers/carts.mongo.js";
import { cidParam } from "../../middlewares/params.mid.js";
import passportCallback from "../../middlewares/passport_callback.mid.js";

const cartsRouter = express.Router();

cartsRouter.param("cid", cidParam);

cartsRouter.post("/create", passportCallback("current"), async (req, res) => {
    try {
        const { products } = req.body;

        if (!Array.isArray(products)) {
            return res.status(400).json({
                message: "El campo 'products' debe ser un arreglo válido.",
            });
        }

        const newCart = await cartsManager.createCart(products);
        if (!newCart) {
            return res.status(500).json({ error: "Error al crear el carrito" });
        }

        res.status(201).json({
            message: "Carrito creado correctamente.",
            cart: newCart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor.",
            error: error.message,
        });
    }
});

cartsRouter.get("/", passportCallback("admin"), async (req, res) => {
    const carts = await cartsManager.readAll();
    if (carts.length === 0) {
        res.status(404).json({
            message: "No hay carritos disponibles.",
        });
    }
    res.status(200).json(carts);
});

cartsRouter.get("/:cid", passportCallback("current"), async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsManager.readById({ _id: cid });

        if (!cart) {
            return res
                .status(404)
                .json({ message: "No se encontro el carrito" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor.",
            error: error.message,
        });
    }
});

cartsRouter.post(
    "/add-product",
    passportCallback("current"),
    async (req, res) => {
        try {
            const { cart_id, product_id, quantity } = req.body;
            const result = await cartsManager.addProductToCart(
                cart_id,
                product_id,
                quantity
            );

            if (result.status === "error") {
                return res.status(400).json({
                    message: result.message,
                });
            }

            res.status(200).json({
                message: "Producto agregado correctamente.",
                cart: result.cart,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error interno del servidor.",
                error: error.message,
            });
        }
    }
);

cartsRouter.put("/:cid", passportCallback("current"), async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        const result = await cartsManager.updateCart(cid, products);
        if (result.status === "error") {
            return res.status(400).json({
                message: result.message,
            });
        }

        res.status(200).json({
            message: "Carrito actualizado correctamente.",
            cart: result.cart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el carrito.",
            error: error.message,
        });
    }
});

cartsRouter.delete("/:cid", passportCallback("admin"), async (req, res) => {
    try {
        const { cid } = req.params;
        const deleted = await cartsManager.destroyById(cid);
        if (!deleted) {
            return res.status(404).json({
                error: "Carrito no encontrado",
            });
        }
        res.status(200).json({ message: "Carrito eliminado correctamente." });
    } catch (error) {
        res.status(500).json({
            message: "Error interno del servidor.",
            error: error.message,
        });
    }
});

export default cartsRouter;
