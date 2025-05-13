import { productsManager } from "../data/dao.factory.js";
import ProductDTO from "../dto/products.dto.js";

export const readAllRepository = async () => {
    return await productsManager.readAll();
};

export const readOneRepository = async (pid) => {
    return await productsManager.readById({ _id: pid });
};

export const createOneRepository = async (product) => {
    const data = new ProductDTO(product);
    return await productsManager.createOne(data);
};

export const updateOneRepository = async (pid, product) => {
    return await productsManager.updateById(pid, product);
};

export const deleteOneRepository = async (pid) => {
    return await productsManager.destroyById(pid);
};
