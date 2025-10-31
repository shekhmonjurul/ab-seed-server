import { addWooComConfig, getAll, getSingelWoocomConfig, } from "../../config/woo-com/woo.com.config.js"
import {insertProductsModel, insertCatagoryModel} from "./products.model.js"

export const addProductService = async (data) => {
    try {

        const res = await addWooComConfig(data)
        return await res.json()
    } catch (error) {

    }

}

export const getProductsService = async (page, limit) => {
    try {
        const products = await getAll({
            routename: "products",
            limit: limit || 10,
            page: page || 1
        })
        let productInfos = []
        if (products) {
            productInfos = products?.data?.map((data) => {
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
    console.log("route name: ", routename)
    const products = await getSingelWoocomConfig(routename)
    if (!products) return
    const serchdata = products?.data?.map((product, index) => {
        const { id, name, short_description, sku, price, regular_price, sale_price, stock_quantity, categories, images, stock_status } = product
        return { id, name, short_description, sku, price, regular_price, sale_price, stock_quantity, categories, images, stock_status }

    })
    return serchdata
}

export const addNewProdcutService = async (body)=> await insertProductsModel(body) 

export const addCatagoryService = async (catagory) => await insertCatagoryModel(catagory)