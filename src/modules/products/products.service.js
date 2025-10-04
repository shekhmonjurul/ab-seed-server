import { addWooComConfig, getProducts, getWoocomConfig } from "../../config/woo-com/woo.com.config.js"

const pages =" ?per_page=20&page=1"
const url = "products"+pages

export const addProductService = async (data) => {
    try {

        const res = await addWooComConfig(data)
        return await res.json()
    } catch (error) {

    }

}

export const getProductsService = async () => {
    try {
        // const woocom = await getWoocomConfig(url)
        // const data = await woocom.json()
        // let productInfos = []
        // if (woocom.ok) {
        //     productInfos = data.map((data) => {
        //         const { name, short_description, sku, price, reguler_price, sale_price, stock_quantity, categories, images, stock_status } = data
        //         return { name, short_description, sku, price, reguler_price, sale_price, stock_quantity, categories, images, stock_status }
        //     })
        // } else {
        //     return "woo-com api conection faild"
        // }
        const products = await getProducts(20, 1)
      console.log("alll product: ", products)
        return products
    } catch (error) {
        console.log(error)
    }
}
