import express from "express"
import colors from "colors"
import swaggerUi from "swagger-ui-express"
import {swaggerUiOptions, swaggerSpec} from "./config/swagger"
import router from "./routes"
import db from "./config/db"

//Conexion base de datos
export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue.bold("Conexion exitosa a la BD"))
    } catch (error) {
        console.log(colors.red(error))
        console.log(colors.red.bold("Hubo un error al conectar a la DB"))
    }
}

connectDB()

//Instancia de expres
const server = express()

//Leer datos JSON
server.use(express.json())

server.use("/api/products", router)

//Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions) )

export default server