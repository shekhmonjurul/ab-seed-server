import { addWooComConfig, getAll, getSingelWoocomConfig, } from "../../config/woo-com/woo.com.config.js"

export const addProductService = async (data) => {
    try {

        const res = await addWooComConfig(data)
        return await res.json()
    } catch (error) {

    }

}

export const getProductsService = async () => {
    try {
        const products = await getAll({
            routename: "products",
            limit: 5,
            page: 1
        })
        let productInfos = []
        if (products) {
            productInfos = products.map((data) => {
                const { id, name, short_description, sku, price, regular_price, sale_price, stock_quantity, categories, images, stock_status } = data
                return { id, name, short_description, sku, price, regular_price, sale_price, stock_quantity, categories, images, stock_status }
            })
        } else {
            return "woo-com api conection faild"
        }

        return productInfos
    } catch (error) {
        console.log(error)
    }
}

export const setcerProducts = async (search) => {
    const routename = `products?search=${encodeURIComponent(search)}&per_page=20`
    const products = await getSingelWoocomConfig(routename)
    if (!products) return
    const serchdata = products.map((product, index) => {
        const { id, name, short_description, sku, price, regular_price, sale_price, stock_quantity, categories, images, stock_status } = product
        return { id, name, short_description, sku, price, regular_price, sale_price, stock_quantity, categories, images, stock_status }

    })
    return serchdata
}