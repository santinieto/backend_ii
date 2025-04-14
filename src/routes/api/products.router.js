import CustomRouter from "../custom.router.js";
import { productsManager } from "../../data/managers/products.mongo.js";
import { pidParam } from "../../middlewares/params.mid.js";
import passportCallback from "../../middlewares/passport_callback.mid.js";

const readAll = async (req, res) => {
    const products = await productsManager.readAll();
    if (products.length === 0) {
        res.json404();
    }
    res.json200(products);
};

const readOne = async (req, res) => {
    const { pid } = req.params;
    const product = await productsManager.readById({ _id: pid });

    if (!product) {
        res.json404();
    }

    res.json200(product);
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
        res.json400();
    }

    const newProduct = await productsManager.createOne(req.body);
    if (!newProduct) {
        res.json500("Error al crear el producto");
    }

    res.json201(newProduct, "Producto creado correctamente.");
};

const updateOne = async (req, res) => {
    const updatedProduct = await productsManager.updateById(
        req.params.pid,
        req.body
    );
    if (!updatedProduct) {
        res.json400("Error al actualizar el producto");
    }

    res.json200(updatedProduct, "Producto actualizado correctamente.");
};

const deleteOne = async (req, res) => {
    const deleted = await productsManager.destroyById({
        _id: req.params.pid,
    });
    if (!deleted) {
        res.json404();
    }

    res.json200({}, "Producto eliminado correctamente.");
};

class ProductsRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.create("/", ["admin"], createOne);
        this.read("/", ["public"], readAll);
        this.read("/:pid", ["public"], readOne);
        this.update("/:pid", ["admin"], updateOne);
        this.delete("/:pid", ["admin"], deleteOne);
        this.param("pid", pidParam);
    };
}

const productsRouter = new ProductsRouter().getRouter();

export default productsRouter;
