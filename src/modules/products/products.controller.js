import * as productService from "./products.service.js"
import { response } from "../../utils/respones.js"
import throwError from "../../utils/throwError.js"
import { getSingelProdcutsModel } from "./products.model.js"
import requestBodyRequiredCheckFunction from "../../utils/requestBodyRequiredCheckFunction.js"

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
    const files = req?.files

    requestBodyRequiredCheckFunction(body, (key !== "long_description" && key !== "category" && key !== "category_id"))

    throwError(!files[0], "prodcut iamege ar requied")

    const result = await productService.addNewProdcutService(body, files || [])

    throwError(!result, "Add product faild")
    response(res, { data: result })
}

export const addCatagoryController = async (req, res) => {
    const catagory = req?.body.catagory
    if (!catagory) {
        throw new Error("Catagory Need")
    }

    const result = await productService.addCatagoryService(catagory)
    if (!result) {
        throw new Error("Catagory add faild")
    }
    response(res, { data: result })
}

export const getAllCatagoryController = async (req, res) => {
    const limit = req?.query?.limit || 10
    const page = req?.query?.page || 1
    const result = await productService.getAllCatagoryService(limit, page)
    throwError(!result, "catagory note found")
    response(res, { data: result })
}

export const getProductsContorller = async (req, res) => {
    const page = Number(req?.query?.page) || 1
    const limit = Number(req?.query?.limit) || 10
    const id = req?.query.id
    let products = id ? await getSingelProdcutsModel(id) : await productService.AllProductsService(page, limit)

    throwError(!products, "Plese try againe")
    response(res, { data: products })
}
export const updateProductContorller = async (req, res) => {
    const body = req?.body
    const id = req?.body?.id
    throwError(!id, "id required")
    const data = await productService.updateProductService(body)
    response(res, { data: data })

}