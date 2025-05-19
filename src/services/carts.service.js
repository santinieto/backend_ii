import cartRepository from "../repositories/carts.repository.js";
import { Service } from "./base.service.js";

class CartService extends Service {
    constructor() {
        super(cartRepository);
    }

    async addProductToCart(cartId, productId, quantity) {
        return await this.repository.addProductToCart(
            cartId,
            productId,
            quantity
        );
    }
}

export const cartService = new CartService();
