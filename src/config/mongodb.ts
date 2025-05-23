import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const mongodbURL = process.env.MONGODB_URL as string;

export default ( async ()=>{
    try{
        await mongoose.connect(mongodbURL);
        console.log("Conectado a MongoDB !");
    } catch(error){
        console.log("Error al conectar a MongoDB", error);
        process.exit(1);
    }
})();
