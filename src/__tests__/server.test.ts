import request from "supertest"
import server, { connectDB} from "../server"
import db from "../config/db"


//Forzar errores
jest.mock("../config/db")

describe("ConnectDB", () => {
    test("Should hanlde database connection error", async () => {
        jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("Hubo un error al conectar a la DB"))
        const consoleSpy = jest.spyOn(console, "log")

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Hubo un error al conectar a la DB")
        )
    })
})