import express from "express"
import router from "./routes"
import db from "./config/db"

//Conexion base de datos
async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log("Conexion exitosa a la BD")
    } catch (error) {
        console.log(error)
        console.log("Hubo un error al conectar a la DB")
    }
}

connectDB()
const server = express()

server.use("/api/products", router)


export default server