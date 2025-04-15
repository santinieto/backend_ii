import { cartsManager } from "../data/managers/carts.mongo.js";

export const createOne = async (req, res) => {
    const { products } = req.body;

    if (!Array.isArray(products)) {
        res.json400("El campo 'products' debe ser un arreglo válido.");
    }

    const newCart = await cartsManager.createCart(products);
    if (!newCart) {
        res.json500("Error al crear el carrito.");
    }

    res.json201(newCart, "Carrito creado correctamente.");
};

export const readAll = async (req, res) => {
    const carts = await cartsManager.readAll();
    if (carts.length === 0) {
        res.json404("No se encontraron carritos.");
    }
    res.json200(carts);
};

export const readOne = async (req, res) => {
    const { cid } = req.params;
    const cart = await cartsManager.readById({ _id: cid });

    if (!cart) {
        res.json404();
    }

    res.status(200).json(cart);
};

export const addProductToCart = async (req, res) => {
    const { cart_id, product_id, quantity } = req.body;
    const result = await cartsManager.addProductToCart(
        cart_id,
        product_id,
        quantity
    );

    if (result.status === "error") {
        res.json400(result.message);
    }

    res.json200(result.cart, "Producto agregado al carrito correctamente.");
};

export const updateOne = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    const result = await cartsManager.updateCart(cid, products);
    if (result.status === "error") {
        res.json400(result.message);
    }

    res.json200(result.cart, "Carrito actualizado correctamente.");
};

export const deleteOne = async (req, res) => {
    const { cid } = req.params;
    const deleted = await cartsManager.destroyById(cid);
    if (!deleted) {
        res.json404("No se encontró el carrito.");
    }
    res.json200(deleted, "Carrito eliminado correctamente.");
};
