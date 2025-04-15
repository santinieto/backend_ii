export const home = async (req, res) => {
    try {
        res.render("home");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const register = async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const login = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const logout = async (req, res) => {
    try {
        res.render("logout");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const profile = async (req, res) => {
    try {
        res.render("profile");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};

export const controlPanel = async (req, res) => {
    try {
        res.render("control_panel");
    } catch (error) {
        console.log(error);
        res.status(500).render("error");
    }
};
