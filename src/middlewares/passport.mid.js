import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { usersManager } from "../data/dao.factory.js";
import { createHash, compareHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";
import UserDTO from "../dto/users.dto.js";

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
                    return done(null, null, {
                        message: "El usuario ya existe en la base de datos",
                        status: 400,
                    });
                }

                /* Si no existe, lo creo */
                const { first_name, last_name, role, city } = req.body;
                const normalizedRole = role?.toUpperCase() || "USER";
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    role: normalizedRole,
                    city,
                };
                const data = new UserDTO(newUser);
                const result = await usersManager.createOne(data);

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
                    return done(null, null, {
                        message: "Usuario no encontrado",
                        status: 401,
                    });
                }
                // console.log(user);

                /* Verifico la contraseña */
                if (!compareHash(password, user.password)) {
                    return done(null, null, {
                        message: "Usuario o contraseña incorrectos",
                        status: 401,
                    });
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

passport.use(
    "current",
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req?.cookies?.token,
            ]),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (jwtPayload, done) => {
            try {
                const user = await usersManager.readBy({
                    _id: jwtPayload.user_id,
                });
                if (!user) {
                    return done(null, null, {
                        message: "Usuario no encontrado",
                        status: 401,
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.use(
    "admin",
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => req?.cookies?.token,
            ]),
            secretOrKey: process.env.JWT_SECRET,
        },
        async (jwtPayload, done) => {
            try {
                const user = await usersManager.readBy({
                    _id: jwtPayload.user_id,
                });
                if (!user) {
                    return done(null, null, {
                        message: "Usuario no encontrado",
                        status: 401,
                    });
                }

                if (user.role.toUpperCase() !== "admin".toUpperCase()) {
                    return done(null, null, {
                        message: "No tiene permisos para acceder",
                        status: 403,
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

export default passport;
