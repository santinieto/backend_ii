import express from "express";
import { engine } from "express-handlebars";
import "dotenv/config.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dbConnect from "./helpers/db_connect.helper.js";
import appRouter from "./routes/app.router.js";
import errorHandler from "./middlewares/error_handler.js";
import pathHandler from "./middlewares/path_handler.mid.js";

// Variables globabes
const PORT = 8080;

// Creo el objeto Server
const server = express();
const ready = async () => {
    // Conecto a la base de datos
    await dbConnect();
    // Inicializo el servidor
    console.log(`Servidor inicializado en el http://localhost:${PORT}`);
};

// Configuraciones del servidor
server.use(express.json()); // Habilitar la lectura de cuerpos JSON
server.use(morgan("dev")); // Logger para ver las peticiones en consola
server.use(cookieParser(process.env.COOKIE_KEY)); // Middleware para leer cookies
server.use(express.urlencoded({ extended: true })); // Middleware para leer datos de formularios

// Configurar ruta publica
server.use(express.static("public"));

// Handlebars
server.engine("handlebars", engine()); // Como va a ser la extension de los archivos
server.set("view engine", "handlebars"); // Seteo
server.set("views", "./src/views"); // Donde tiene que buscar las vistas

// Endpoints
server.use("/", appRouter);
server.use(errorHandler);
server.use(pathHandler);

// Inicializo el servidor
server.listen(PORT, ready);
