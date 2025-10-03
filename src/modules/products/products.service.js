import { addWooComConfig, getWoocomConfig } from "../../config/woo-com/woo.com.config.js"

export const addProductService = async (data) => {
    try {

        const res = await addWooComConfig(data, "products")
        return await res.json()

    } catch (error) {

    }

}

export const getProductsService = async () => {
    try {
        const woocom = await getWoocomConfig('products')
        const data = await woocom.json()
        if (data.ok) {
            const productInfos = data.map((data) => {
                const { name, short_description, sku, price, reguler_price, sale_price, stock_quantity, categories, images, stock_status } = data
                return { name, short_description, sku, price, reguler_price, sale_price, stock_quantity, categories, images, stock_status }
            })
        }else{
            return "woo-com api conection faild"
        }

        const productsname = productInfos.map((productInfo) => productInfo.name)
        console.log("product names: ", productInfos)
        return productInfos
    } catch (error) {
        console.log(error)
    }
}
