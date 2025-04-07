import { response, Router } from "express";
import passport from "../../midlewares/passport.mid.js"; // Importamos el middleware de passport
import { isUser } from "../../midlewares/is_user.mid.js";

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
        res.status(200).json({
            response: req.token, // Respondemos con el token de acceso
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
        res.status(200).json({
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
}

authRouter.post(
    "/register",
    passport.authenticate("register", { session: false }), // Implementamos la estrategia de registro
    register
);

authRouter.post(
    "/login",
    passport.authenticate("login", { session: false }), // Implementamos la estrategia de login
    login
);

authRouter.get(
    "/profile",
    passport.authenticate("current", { session: false }), // Implementamos la estrategia de JWT
    profile
);

authRouter.get(
    "/logout",
    passport.authenticate("current", { session: false }), // Implementamos la estrategia de JWT
    logout
);

authRouter.get(
    "/control-panel",
    passport.authenticate("admin", { session: false }), // Implementamos la estrategia de JWT
    isUser,
    controlPanel
);

export default authRouter;
