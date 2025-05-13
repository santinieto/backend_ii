import { cartsManager } from "../data/dao.factory.js";

export const createCartService = async (products) => {
    return await cartsManager.createCart(products);
};

export const readAllService = async () => {
    return await cartsManager.readAll();
};

export const readOneService = async (cid) => {
    return await cartsManager.readById({ _id: cid });
};

export const addProductToCartService = async (
    cart_id,
    product_id,
    quantity
) => {
    return await cartsManager.addProductToCart(cart_id, product_id, quantity);
};

export const updateOneService = async (cid, products) => {
    return await cartsManager.updateCart(cid, products);
};

export const deleteOneService = async (cid) => {
    return await cartsManager.destroyById(cid);
};
