import CustomRouter from "../custom.router.js";
import passportCallback from "../../middlewares/passport_callback.mid.js"; // Importamos el middleware de passport

const register = async (req, res, next) => {
    res.status(201).json({
        response: req.user._id, // Respondemos solo con el ID del usuario registrado
        method: req.method,
        url: req.originalUrl,
        status: "success",
    });
};

const login = async (req, res, next) => {
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
};

const logout = async (req, res, next) => {
    res.clearCookie("token").status(200).json({
        response: "Logout exitoso!",
        method: req.method,
        url: req.originalUrl,
        status: "success",
    });
};

const profile = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        response: user,
        method: req.method,
        url: req.originalUrl,
        status: "success",
    });
};

const controlPanel = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        response: user,
        method: req.method,
        url: req.originalUrl,
        status: "success",
    });
};

class AuthRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.create("/register", passportCallback("register"), register);
        this.create("/login", passportCallback("login"), login);
        this.read("/profile", passportCallback("current"), profile);
        this.read("/logout", passportCallback("current"), logout);
        this.read("/control-panel", passportCallback("admin"), controlPanel);
    };
}

const authRouter = new AuthRouter().getRouter();

export default authRouter;
