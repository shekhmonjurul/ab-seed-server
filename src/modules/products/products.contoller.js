import * as productService from "./products.service.js"

export const getProducts = async (req, res, next) => {
    try {
        const body = req.body
        const data = await productService.getProductsService()
        res.status(200).json({
            mgs: "All Product recive successfuly",
            data,
            ok: true
        })
    } catch (error) {
        next(error)
    }
}

export const addProduct = async(req, res, next) => {
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