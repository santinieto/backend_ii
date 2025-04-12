import CustomRouter from "../custom.router.js";
import { cartsManager } from "../../data/managers/carts.mongo.js";
import { cidParam } from "../../middlewares/params.mid.js";
import passportCallback from "../../middlewares/passport_callback.mid.js";

const createOne = async (req, res) => {
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

const readAll = async (req, res) => {
    const carts = await cartsManager.readAll();
    if (carts.length === 0) {
        res.json404("No se encontraron carritos.");
    }
    res.json200(carts);
};

const readOne = async (req, res) => {
    const { cid } = req.params;
    const cart = await cartsManager.readById({ _id: cid });

    if (!cart) {
        res.json404();
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
        res.json400(result.message);
    }

    res.json200(result.cart, "Producto agregado al carrito correctamente.");
};

const updateOne = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    const result = await cartsManager.updateCart(cid, products);
    if (result.status === "error") {
        res.json400(result.message);
    }

    res.json200(result.cart, "Carrito actualizado correctamente.");
};

const deleteOne = async (req, res) => {
    const { cid } = req.params;
    const deleted = await cartsManager.destroyById(cid);
    if (!deleted) {
        res.json404("No se encontró el carrito.");
    }
    res.json200(deleted, "Carrito eliminado correctamente.");
};

class CartsRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.create("/create", ["user"], createOne);
        this.read("/", ["admin"], readAll);
        this.read("/:cid", ["user", "admin"], readOne);
        this.update("/:cid", ["user", "admin"], updateOne);
        this.delete("/:cid", ["admin"], deleteOne);
        this.create("/add-product", ["user", "admin"], addProductToCart);
        this.param("cid", cidParam);
    };
}

const cartsRouter = new CartsRouter().getRouter();

export default cartsRouter;
