import { DatabaseConnect } from "../helpers/db_connect.helper.js";

const { PERSISTENCE } = process.env;

let dao = {};

/* Patron factory */
switch (PERSISTENCE) {
    case "MONGO":
        // Conecto a la base de datos
        const db = new DatabaseConnect(process.env.MONGO_URI);
        await db.connectToDatabase();

        {
            const { usersManager } = await import("./mongo/manager.mongo.js");
            const { productsManager } = await import(
                "./mongo/products.mongo.js"
            );
            const { cartsManager } = await import("./mongo/carts.mongo.js");
            dao = {
                usersManager,
                productsManager,
                cartsManager,
            };
        }
        break;
    case "MEMORY":
        break;
    case "FS":
        console.log("Conectado a la base de datos local");

        {
            const { usersManager } = await import("./fs/users.fs.js");
            const { productsManager } = await import("./fs/products.fs.js");
            const { cartsManager } = await import("./fs/carts.fs.js");
            dao = {
                usersManager,
                productsManager,
                cartsManager,
            };
        }
        break;
    default:
        {
            const { usersManager } = await import("./mongo/manager.mongo.js");
            const { productsManager } = await import(
                "./mongo/products.mongo.js"
            );
            const { cartsManager } = await import("./mongo/carts.mongo.js");
            dao = {
                usersManager,
                productsManager,
                cartsManager,
            };
        }
        break;
}

const { usersManager, productsManager, cartsManager } = dao;
export { usersManager, productsManager, cartsManager };
export default dao;
