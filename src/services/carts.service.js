import CartDTO from "../dto/carts.dto.js";
import {
    createCartRepository,
    readAllRepository,
    readOneRepository,
    addProductToCartRepository,
    updateOneRepository,
    deleteOneRepository,
} from "../repositories/carts.repository.js";

export const createCartService = async (products) => {
    return await createCartRepository(products);
};

export const readAllService = async () => {
    return await readAllRepository();
};

export const readOneService = async (cid) => {
    return readOneRepository(cid);
};

export const addProductToCartService = async (
    cart_id,
    product_id,
    quantity
) => {
    return await addProductToCartRepository(cart_id, product_id, quantity);
};

export const updateOneService = async (cid, products) => {
    return await updateOneRepository(cid, products);
};

export const deleteOneService = async (cid) => {
    return await deleteOneRepository(cid);
};
