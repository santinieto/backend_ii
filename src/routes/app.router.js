import { Router } from "express";
import apiRouter from "./api.router.js";
import viewsRouter from "./views.router.js";

const appRouter = Router();

appRouter.use("/", viewsRouter);
appRouter.use("/api", apiRouter);

export default appRouter;
