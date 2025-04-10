import { Router } from "express";
import mongoose from "mongoose";
import { productsManager } from "../../data/manager.mongo.js";

const productsRouter = Router();

// Middleware para manejar errores en funciones asíncronas
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware para validar ObjectId de MongoDB
const validateObjectId = (req, res, next) => {
    const { pid } = req.params;
    if (pid && !mongoose.Types.ObjectId.isValid(pid)) {
        return res
            .status(400)
            .json({ error: "El ID del producto no es un ObjectId válido." });
    }
    next();
};

productsRouter.get(
    "/",
    asyncHandler(async (req, res) => {
        const products = await productsManager.readAll();
        if (products.length === 0) {
            res.status(404).json({
                message: "No hay productos disponibles.",
            });
        }
        res.status(200).json(products);
    })
);

productsRouter.get(
    "/:pid",
    validateObjectId,
    asyncHandler(async (req, res) => {
        const { pid } = req.params;
        const product = await productsManager.readById({ _id: pid });

        if (!product) {
            return res
                .status(404)
                .json({ message: "No se encontro el producto" });
        }

        res.status(200).json(product);
    })
);

productsRouter.post(
    "/",
    asyncHandler(async (req, res) => {
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
            return res
                .status(500)
                .json({ error: "Error al crear el producto" });
        }

        res.status(201).json({
            message: "Producto agregado correctamente.",
            product: newProduct,
        });
    })
);

productsRouter.put(
    "/:pid",
    validateObjectId,
    asyncHandler(async (req, res) => {
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
    })
);

productsRouter.delete(
    "/:pid",
    validateObjectId,
    asyncHandler(async (req, res) => {
        const deleted = await productsManager.destroyById(req.params.pid);
        if (!deleted) {
            return res.status(404).json({
                error: "Error al eliminar el producto",
            });
        }
        res.json({
            message: "Producto eliminado correctamente.",
        });
    })
);

export default productsRouter;
