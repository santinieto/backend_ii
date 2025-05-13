import { productsManager } from "../data/dao.factory.js";
import ProductDTO from "../dto/products.dto.js";
import {
    readAllRepository,
    readOneRepository,
    createOneRepository,
    updateOneRepository,
    deleteOneRepository,
} from "../repositories/products.repository.js";

export const readAllService = async () => {
    return await readAllRepository();
};

export const readOneService = async (pid) => {
    return await readOneRepository(pid);
};

export const createOneService = async (product) => {
    return await createOneRepository(product);
};

export const updateOneService = async (pid, product) => {
    return await updateOneRepository(pid, product);
};

export const deleteOneService = async (pid) => {
    return await deleteOneRepository(pid);
};
