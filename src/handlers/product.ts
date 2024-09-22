import { Request, Response } from "express"
import { check, validationResult } from "express-validator"
import Product from "../models/Product.model"
import { IsNumeric } from "sequelize-typescript"
import colors from "colors"

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            where: {visible : true},
            attributes: {exclude: ["createdAt", "updatedAt"]}
        })
        res.json({data: products})
    } catch (error) {
        console.log(colors.red(error))
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product){
            return res.status(404).json({error: "Producto no encontrado"})
        }

        res.json({data: product})
    } catch (error) {
        console.log(colors.red(error))
    }
}

export const createProduct = async ( req : Request, res : Response) => {
    const product = await Product.create(req.body)
    res.json({data: product})
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({error: "Producto no encontrado"})
    }

    //Actualizar
    await product.update(req.body)
    await product.save()

    res.json({data: product})
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({error: "Producto no encontrado"})
    }

    //Actualizar
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({data: product})
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({error: "Producto no encontrado"})
    }

    product.visible = !product.dataValues.visible
    await product.save()
    res.json({data: "Producto Eliminado"})
}