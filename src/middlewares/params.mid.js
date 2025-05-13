import mongoose from "mongoose";

const isValidHexId = (id) => /^[a-fA-F0-9]{24}$/.test(id);
const isValidUUID = (id) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(
        id
    );

const isValidId = (id) => {
    if (mongoose.Types.ObjectId.isValid(id)) {
        return true;
    } else if (
        typeof id === "string" &&
        (isValidHexId(id) || isValidUUID(id))
    ) {
        return true;
    } else {
        return false;
    }
};

const pidParam = (req, res, next, pid) => {
    try {
        if (!pid) {
            const error = new Error("El ID de producto es obligatorio.");
            error.status = 400;
            throw error;
        }

        // Validar como ObjectId o como string de 24 caracteres hex
        if (!isValidId(pid)) {
            const error = new Error(
                "El ID de producto no es un ObjectId válido."
            );
            error.status = 400;
            throw error;
        }

        next();
    } catch (error) {
        next(error);
    }
};

const cidParam = (req, res, next, cid) => {
    try {
        if (!cid) {
            const error = new Error("El ID de carrito es obligatorio.");
            error.status = 400;
            throw error;
        }

        // Verificar si el ID es un ObjectId válido
        if (!isValidId(cid)) {
            const error = new Error(
                "El ID de carrito no es un ObjectId válido."
            );
            error.status = 400;
            throw error;
        }

        next();
    } catch (error) {
        next(error);
    }
};

export { pidParam, cidParam };
