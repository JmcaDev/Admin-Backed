import { Router } from "express"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"
import { body, param } from "express-validator"

const router = Router()

//*Routing

//Obtener Productos
router.get("/", getProducts)

//Obtener Producto por Id
router.get("/:id", 
    param("id").isInt().withMessage("Id no valido"),
    handleInputErrors,
    getProductById)

//Agregar Productos
router.post("/", 
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede ir vacio"),
    body("price")
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
        .custom(value => value > 0).withMessage("Precio no valido"),
    handleInputErrors, 
    createProduct)

//Actualizar Producto entero
router.put("/:id",
    param("id").isInt().withMessage("Id no valido"),
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede ir vacio"),
    body("price")
        .isNumeric().withMessage("Valor no valido")
        .notEmpty().withMessage("El precio del producto no puede ir vacio")
    .custom(value => value > 0).withMessage("Precio no valido"),
    body("availability")
        .isBoolean().withMessage("Valor disponibilidad no valido"),
    handleInputErrors, 
    updateProduct)

router.patch("/:id", param("id").isInt().withMessage("Id no valido"), handleInputErrors,updateAvailability)

router.delete("/:id", param("id").isInt().withMessage("Id no valido"), handleInputErrors, deleteProduct)

export default router