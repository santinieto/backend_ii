import { connect } from "mongoose";

const dbConnect = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log("Conexion con MongoDB exitosa");
    } catch (error) {
        console.error("Error al establecer conexion con MongoDB:", error);
    }
};

export default dbConnect;
