import * as productService from "./products.service.js"
import { response } from "../../utils/respones.js"
export const getProducts = async (req, res, next) => {
    try {
        const { page, limit } = req?.query
        const data = await productService.getProductsService(page, limit)
        if (data) {
            res.status(200).json({
                mgs: "All Product recive successfuly",
                data,
                ok: true
            })
        } else {
            res.status(404).json({
                mgs: "No data found",
                data: [],
                ok: false
            })
        }
    } catch (error) {
        next(error)
    }
}

export const addProduct = async (req, res, next) => {
    try {
        const body = req.body
        const data = await productService.addProductService(body)
        res.status(200).json({
            ok: true,
            mgs: "Product add Successfuly",
            data
        })
    } catch (error) {
        next(error)
    }

}

export const searchProductController = async (req, res, next) => {
    try {
        const search = req?.query.search
        if (!search) {
            next()
            return
        }
        console.log(req.url)
        const data = await productService.setcerProducts(search)
        if (!data) res.status(404).json({ mgs: "data not found", sku, data: [] })
        res.status(200).json({ mgs: "recive data all", ok: true, data })

    } catch (error) {
        next(error)
    }
}

export const addProductController = async (req, res) => {
    const body = req?.body
    if (!body) {
        throw new Error("All data ar required")
    }
    const result = await productService.addNewProdcutService(body)
    if (!result) {
        throw new Error("Add product faild")
    }

    response(res, { data: result })
}

export const addCatagoryController = async (req, res)=>{
    const catagory = req?.body.catagory
    if(!catagory){
        throw new Error("Catagory Need")
    }

    const result = await productService.addCatagoryService(catagory)
    if(!result){
        throw new Error("Catagory add faild")
    }
    response(res, {data: result})
}