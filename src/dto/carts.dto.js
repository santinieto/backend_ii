import crypto from "crypto";
const { PERSISTENCE } = process.env;

class CartDTO {
    constructor(data) {
        // Asignar _id dependiendo de la persistencia
        this._id =
            PERSISTENCE !== "MONGO"
                ? crypto.randomBytes(12).toString("hex")
                : data._id;

        // Normalizamos productos incluyendo el _id del subdocumento (si existe)
        this.products = Array.isArray(data.products)
            ? data.products
                  .filter((prod) => prod && prod.id && prod.quantity)
                  .map((prod) => ({
                      id: prod.id,
                      quantity: prod.quantity,
                      _id: prod._id,
                  }))
            : [];

        // Timestamps: usamos los que vienen o generamos nuevos
        this.createdAt =
            data.createdAt ||
            (PERSISTENCE === "MONGO" ? new Date() : undefined);
        this.updatedAt =
            data.updatedAt ||
            (PERSISTENCE === "MONGO" ? new Date() : undefined);
    }
}

export default CartDTO;
