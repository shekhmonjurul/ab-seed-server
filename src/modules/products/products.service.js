import { addWooComConfig, getAll, getSingelWoocomConfig, } from "../../config/woo-com/woo.com.config.js"
import { insertProductsModel, insertCatagoryModel, getAllProdcutsModel, updateProductModel, getAllCatagoryModel} from "./products.model.js"

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

export const addNewProdcutService = async (body, files = []) => {

    // main_image,
    // product_photos
    const main_image = `http://localhost:5000/products/images/${files[0]?.filename}`
    let product_photos = files.slice(1)
    product_photos = product_photos.map(photo => ({ src: `http://localhost:5000/products/images/${photo.filename}` }))

    const newProduct = {
        ...body,
        main_image,
        product_photos
    }
    return await insertProductsModel(newProduct)
}
export const addCatagoryService = async (catagory) => await insertCatagoryModel(catagory)

export const AllProductsService = async (page, limit) => {
    const offset = (page - 1) * limit
    const products = await getAllProdcutsModel(limit, offset)
    return products
}


export const updateProductService = async (body) => {

    let keys = []
    let values = []

    if (typeof body === "object") {
        for (let key in body) {
            values.push(body[key])
            if (key === "id") break
            keys.push(`${key}=?`)
        }
    }

    keys = keys.join(",")

    const result = await updateProductModel(keys, values)
    return result

}

export const getAllCatagoryService = async (limit, page) => {
    const offset = (page-1) * limit
    const result = await getAllCatagoryModel(limit, offset) 
    return result
}