import * as productService from "./products.service.js"

export const getProducts = async (req, res, next) => {
    try {
        const body = req.body
        const data = await productService.getProductsService()
        if (data) {
            res.status(200).json({
                mgs: "All Product recive successfuly",
                data,
                ok: true
            })
        }else{
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