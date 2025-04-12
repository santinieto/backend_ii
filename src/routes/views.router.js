import CustomRouter from "./custom.router.js";

const home = async (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

const register = async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

const login = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

const logout = async (req, res) => {
    try {
        res.render("logout");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

const profile = async (req, res) => {
    try {
        res.render("profile");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

const controlPanel = async (req, res) => {
    try {
        res.render("control_panel");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

class ViewsRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }

    init = () => {
        this.read("/", [], home);
        this.read("/register", [], register);
        this.read("/login", [], login);
        this.read("/logout", [], logout);
        this.read("/profile", [], profile);
        this.read("/control-panel", [], controlPanel);
    };
}

const viewsRouter = new ViewsRouter().getRouter();

export default viewsRouter;
