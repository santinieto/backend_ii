import CustomRouter from "../custom.router.js";
import passportCallback from "../../middlewares/passport_callback.mid.js"; // Importamos el middleware de passport
import {
    register,
    login,
    logout,
    profile,
    controlPanel,
} from "../../controllers/auth.controller.js"; // Importamos los controladores

class AuthRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.create(
            "/register",
            ["public"],
            passportCallback("register"),
            register
        );
        this.create("/login", ["public"], passportCallback("login"), login);
        this.read(
            "/profile",
            ["user", "admin"],
            passportCallback("current"),
            profile
        );
        this.read(
            "/logout",
            ["public", "admin"],
            passportCallback("current"),
            logout
        );
        this.read(
            "/control-panel",
            ["admin"],
            passportCallback("admin"),
            controlPanel
        );
    };
}

const authRouter = new AuthRouter().getRouter();

export default authRouter;
