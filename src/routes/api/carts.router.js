import CustomRouter from "../custom.router.js";
import { cartsManager } from "../../data/managers/carts.mongo.js";
import { cidParam } from "../../middlewares/params.mid.js";
import passportCallback from "../../middlewares/passport_callback.mid.js";

const createOne = async (req, res) => {
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
};

const readAll = async (req, res) => {
    const carts = await cartsManager.readAll();
    if (carts.length === 0) {
        res.status(404).json({
            message: "No hay carritos disponibles.",
        });
    }
    res.status(200).json(carts);
};

const readOne = async (req, res) => {
    const { cid } = req.params;
    const cart = await cartsManager.readById({ _id: cid });

    if (!cart) {
        return res.status(404).json({ message: "No se encontro el carrito" });
    }

    res.status(200).json(cart);
};

const addProductToCart = async (req, res) => {
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
};

const updateOne = async (req, res) => {
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
};

const deleteOne = async (req, res) => {
    const { cid } = req.params;
    const deleted = await cartsManager.destroyById(cid);
    if (!deleted) {
        return res.status(404).json({
            error: "Carrito no encontrado",
        });
    }
    res.status(200).json({ message: "Carrito eliminado correctamente." });
};

class CartsRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.create("/create", passportCallback("current"), createOne);
        this.read("/", passportCallback("admin"), readAll);
        this.read("/:cid", passportCallback("current"), readOne);
        this.update("/:cid", passportCallback("current"), updateOne);
        this.delete("/:cid", passportCallback("admin"), deleteOne);
        this.create(
            "/add-product",
            passportCallback("current"),
            addProductToCart
        );
        this.param("cid", cidParam);
    };
}

const cartsRouter = new CartsRouter().getRouter();

export default cartsRouter;
