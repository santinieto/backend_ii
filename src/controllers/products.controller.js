import {
    createOneService,
    deleteOneService,
    readAllService,
    readOneService,
    updateOneService,
} from "../services/products.service.js";

export const readAll = async (req, res) => {
    const products = await readAllService();
    if (products.length === 0) {
        res.json404();
    }
    res.json200(products);
};

export const readOne = async (req, res) => {
    const { pid } = req.params;
    const product = await readOneService(pid);

    if (!product) {
        res.json404();
    }

    res.json200(product);
};

export const createOne = async (req, res) => {
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
        res.json400();
    }

    const newProduct = await createOneService(req.body);
    if (!newProduct) {
        res.json500("Error al crear el producto");
    }

    res.json201(newProduct, "Producto creado correctamente.");
};

export const updateOne = async (req, res) => {
    const updatedProduct = await updateOneService(req.params.pid, req.body);
    if (!updatedProduct) {
        res.json400("Error al actualizar el producto");
    }

    res.json200(updatedProduct, "Producto actualizado correctamente.");
};

export const deleteOne = async (req, res) => {
    const deleted = await deleteOneService({
        _id: req.params.pid,
    });
    if (!deleted) {
        res.json404();
    }

    res.json200({}, "Producto eliminado correctamente.");
};
