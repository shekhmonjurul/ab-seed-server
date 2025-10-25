import * as productService from "./products.service.js"

export const getProducts = async (req, res, next) => {
    try {
        const {page, limit} = req?.query
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