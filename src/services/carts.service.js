import cartRepository from "../repositories/carts.repository.js";
import { productService } from "./products.service.js";
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

    async getDetailedCart(cartId) {
        const cartData = await this.repository.readOne(cartId);
        if (!cartData) return null;

        // Agregamos detalle de productos
        const detailedProducts = await Promise.all(
            cartData.products.map(async (prod) => {
                const product = await productService.readOne(prod.id);
                return {
                    id: prod.id,
                    name: product?.name || "Producto desconocido",
                    price: product?.price || 0,
                    quantity: prod.quantity,
                    discount: product.discount,
                    priceAtPurchase:
                        (product?.price || 0) -
                        ((product?.price || 0) * product.discount) / 100,
                    subtotal: (product?.price || 0) * prod.quantity,
                };
            })
        );

        const total = detailedProducts.reduce(
            (sum, p) => sum + p.priceAtPurchase,
            0
        );

        return {
            _id: cartData._id,
            products: detailedProducts,
            total,
            createdAt: cartData.createdAt,
            updatedAt: cartData.updatedAt,
        };
    }
}

export const cartService = new CartService();
