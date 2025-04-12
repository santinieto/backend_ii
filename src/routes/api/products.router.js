import { Router } from "express";
import CustomRouter from "../custom.router.js";
import { productsManager } from "../../data/managers/manager.mongo.js";
import { pidParam } from "../../middlewares/params.mid.js";
import passportCallback from "../../middlewares/passport_callback.mid.js";

const readAll = async (req, res) => {
    const products = await productsManager.readAll();
    if (products.length === 0) {
        res.status(404).json({
            message: "No hay productos disponibles.",
        });
    }
    res.status(200).json(products);
};

const readOne = async (req, res) => {
    const { pid } = req.params;
    const product = await productsManager.readById({ _id: pid });

    if (!product) {
        return res.status(404).json({ message: "No se encontro el producto" });
    }

    res.status(200).json(product);
};

const createOne = async (req, res) => {
    // Todos los campos son obligatorios a excepción de thumbnails
    // El ID lo genera automaticamente NoSQL
    const requiredFields = [
        "name",
        "price",
        "discount",
        "category",
        "description",
        "stock",
        "code",
        "status",
    ];

    // Verificar si todos los campos obligatorios existen en el body
    const missingFields = requiredFields.filter(
        (field) => !(field in req.body)
    );

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: "Faltan campos obligatorios.",
            missingFields,
        });
    }

    const newProduct = await productsManager.createOne(req.body);
    if (!newProduct) {
        return res.status(500).json({ error: "Error al crear el producto" });
    }

    res.status(201).json({
        message: "Producto agregado correctamente.",
        product: newProduct,
    });
};

const updateOne = async (req, res) => {
    const updatedProduct = await productsManager.updateById(
        req.params.pid,
        req.body
    );
    if (!updatedProduct) {
        return res.status(400).json({
            error: "Error al actualizar el producto",
        });
    }
    res.status(200).json({
        message: "Producto actualizado correctamente.",
        product: updatedProduct,
    });
};

const deleteOne = async (req, res) => {
    const deleted = await productsManager.destroyById({
        _id: req.params.pid,
    });
    console.log(deleted);
    if (!deleted) {
        return res.status(404).json({
            message: "Producto no encontrado",
        });
    }
    res.json({
        message: "Producto eliminado correctamente.",
    });
};

class ProductsRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.create("/", passportCallback("admin"), createOne);
        this.read("/", passportCallback("current"), readAll);
        this.read("/:pid", passportCallback("current"), readOne);
        this.update("/:pid", passportCallback("admin"), updateOne);
        this.delete("/:pid", passportCallback("admin"), deleteOne);
        this.param("pid", pidParam);
    };
}

const productsRouter = new ProductsRouter().getRouter();

export default productsRouter;
