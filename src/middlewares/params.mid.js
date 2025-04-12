import mongoose from "mongoose";

const pidParam = (req, res, next, pid) => {
    try {
        if (!pid) {
            const error = new Error("El ID de producto es obligatorio.");
            error.status = 400;
            throw error;
        }

        // Verificar si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(pid)) {
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

const cidParam = (req, res, next, pid) => {
    try {
        if (!pid) {
            const error = new Error("El ID de carrito es obligatorio.");
            error.status = 400;
            throw error;
        }

        // Verificar si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(pid)) {
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
