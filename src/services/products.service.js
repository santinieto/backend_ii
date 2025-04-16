import { productsManager } from "../data/managers/products.mongo.js";

export const readAllService = async () => {
    return await productsManager.readAll();
};

export const readOneService = async (pid) => {
    return await productsManager.readById({ _id: pid });
};

export const createOneService = async (product) => {
    return await productsManager.createOne(product);
};

export const updateOneService = async (pid, product) => {
    return await productsManager.updateById(pid, product);
};

export const deleteOneService = async (pid) => {
    return await productsManager.destroyById(pid);
};
