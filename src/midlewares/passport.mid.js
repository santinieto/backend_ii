import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usersManager } from "../data/manager.mongo.js";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";

passport.use(
    "register",
    new LocalStrategy(
        /* Objeto de configuracion de la estrategia */
        {
            passReqToCallback: true, // Le paso el request a la estrategia
            usernameField: "email", // Campo que se va a usar como nombre de usuario
        },
        /* Callback de la estrategia */
        async (req, email, password, done) => {
            try {
                /* Verifico si el usuario ya existe */
                const user = await usersManager.readBy({ email });
                if (user) {
                    const error = new Error(
                        "El usuario ya existe en la base de datos"
                    );
                    error.status = 401;
                    throw error;
                }

                /* Si no existe, lo creo */
                const { first_name, last_name } = req.body;
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                };
                const result = await usersManager.createOne(newUser);

                /* Sigo con la ejecucion */
                return done(null, result);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        /* Objeto de configuracion de la estrategia */
        {
            passReqToCallback: true, // Le paso el request a la estrategia
            usernameField: "email", // Campo que se va a usar como nombre de usuario
        },
        /* Callback de la estrategia */
        async (req, email, password, done) => {
            try {
                // console.log("Login strategy called");
                // console.log(req.body);
                // console.log(email, password);

                /* Busco el usuario */
                const user = await usersManager.readBy({ email });
                if (!user) {
                    const error = new Error("Usuario no encontrado");
                    error.status = 401;
                    throw error;
                }
                // console.log(user);

                /* Verifico la contraseña */
                if (!compareHash(password, user.password)) {
                    const error = new Error("Usuario o contraseña incorrectos");
                    error.status = 401;
                    throw error;
                }
                // console.log("Contraseña correcta");

                /* Creo el token */
                const data = {
                    user_id: user._id,
                    role: user.role,
                };
                const token = createToken(data);
                req.token = token; // Agrego el token al request para usarlo en el controlador

                /* Sigo con la ejecucion */
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

export default passport;
