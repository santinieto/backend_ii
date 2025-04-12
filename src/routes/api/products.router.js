import { Router } from "express";
import { productsManager } from "../../data/managers/manager.mongo.js";
import { pidParam } from "../../middlewares/params.mid.js";
import passportCallback from "../../middlewares/passport_callback.mid.js";

const productsRouter = Router();

// Middleware para manejar errores en funciones asíncronas
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

productsRouter.param("pid", pidParam);

productsRouter.get(
    "/",
    passportCallback("current"),
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
    passportCallback("current"),
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
    passportCallback("admin"),
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
    passportCallback("admin"),
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
    passportCallback("admin"),
    asyncHandler(async (req, res) => {
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
    })
);

export default productsRouter;
