import { cartsManager } from "../data/dao.factory.js";
import CartDTO from "../dto/carts.dto.js";

export const createCartRepository = async (products) => {
    const data = new CartDTO({ products: products });
    return await cartsManager.createCart(data);
};

export const readAllRepository = async () => {
    return await cartsManager.readAll();
};

export const readOneRepository = async (cid) => {
    return await cartsManager.readById({ _id: cid });
};

export const addProductToCartRepository = async (
    cart_id,
    product_id,
    quantity
) => {
    return await cartsManager.addProductToCart(cart_id, product_id, quantity);
};

export const updateOneRepository = async (cid, products) => {
    return await cartsManager.updateCart(cid, products);
};

export const deleteOneRepository = async (cid) => {
    return await cartsManager.destroyById(cid);
};
