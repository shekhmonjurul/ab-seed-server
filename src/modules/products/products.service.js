import * as woocomConfig from "../../config/woo-com/woo.com.config"
 
export const addProductService = async (data) => {
    try {
        
        const res = await woocomConfig.addWooComConfig(data, "products")
        return await res.json()
        
    } catch (error) {
        
    }

}

export const getProductsService = async () => {
    try {
        const woocom = await woocomConfig.getWoocomConfig('products')
        const data = await woocom.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

