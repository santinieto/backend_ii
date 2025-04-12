import { Router } from "express";
import setupResponses from "../middlewares/setup_responses.mid.js";

class CustomRouter {
    constructor() {
        this.router = Router();
        this.use(setupResponses);
    }

    getRouter() {
        return this.router;
    }

    applyMiddleware = (cbs) => {
        return cbs.map((cb) => async (req, res, next) => {
            try {
                await cb(req, res, next);
            } catch (error) {
                next(error);
            }
        });
    };

    create = (path, ...cbs) => {
        this.router.post(path, this.applyMiddleware(cbs));
    };

    read = (path, ...cbs) => {
        this.router.get(path, this.applyMiddleware(cbs));
    };

    update = (path, ...cbs) => {
        this.router.put(path, this.applyMiddleware(cbs));
    };

    delete = (path, ...cbs) => {
        this.router.delete(path, this.applyMiddleware(cbs));
    };

    use = (path, ...cbs) => {
        this.router.use(path, this.applyMiddleware(cbs));
    };

    param = (paramName, cb) => {
        this.router.param(paramName, cb);
    };
}

export default CustomRouter;
