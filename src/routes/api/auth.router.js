import { response, Router } from "express";
import passportCallback from "../../middlewares/passport_callback.mid.js"; // Importamos el middleware de passport

const authRouter = Router();

const register = async (req, res, next) => {
    try {
        res.status(201).json({
            response: req.user._id, // Respondemos solo con el ID del usuario registrado
            method: req.method,
            url: req.originalUrl,
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        res.cookie("token", req.token, {
            maxAge: 1000 * 60 * 60, // 1 hora
            httpOnly: true, // Solo el servidor puede acceder a la cookie
        })
            .status(200)
            .json({
                response: req.token, // Respondemos con el usuario de acceso
                method: req.method,
                url: req.originalUrl,
                status: "success",
            });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        res.clearCookie("token").status(200).json({
            response: "Logout exitoso!",
            method: req.method,
            url: req.originalUrl,
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

const profile = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({
            response: user,
            method: req.method,
            url: req.originalUrl,
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

const controlPanel = async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json({
            response: user,
            method: req.method,
            url: req.originalUrl,
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

authRouter.post(
    "/register",
    passportCallback("register"), // Implementamos la estrategia de registro
    register
);

authRouter.post(
    "/login",
    passportCallback("login"), // Implementamos la estrategia de login
    login
);

authRouter.get(
    "/profile",
    passportCallback("current"), // Implementamos la estrategia de JWT
    profile
);

authRouter.get(
    "/logout",
    passportCallback("current"), // Implementamos la estrategia de JWT
    logout
);

authRouter.get(
    "/control-panel",
    passportCallback("admin"), // Implementamos la estrategia de JWT
    controlPanel
);

export default authRouter;
