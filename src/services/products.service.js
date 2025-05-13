import { productsManager } from "../data/dao.factory.js";
import ProductDTO from "../dto/products.dto.js";

export const readAllService = async () => {
    return await productsManager.readAll();
};

export const readOneService = async (pid) => {
    return await productsManager.readById({ _id: pid });
};

export const createOneService = async (product) => {
    const data = new ProductDTO(product);
    return await productsManager.createOne(data);
};

export const updateOneService = async (pid, product) => {
    return await productsManager.updateById(pid, product);
};

export const deleteOneService = async (pid) => {
    return await productsManager.destroyById(pid);
};
