import express from "express"

const server = express()

//Routing
server.get("/", (req,res) => {
    res.send("Hola")
})

export default server