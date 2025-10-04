import Buffer from "buffer"
import { configDotenv } from "dotenv";

configDotenv()

const credentials = Buffer.Buffer.from(`${process.env.ConsumerKey}:${process.env.ConsumerSecret}`).toString('base64');

export const getWoocomConfig = async (route) => {

    const res = await fetch(`${process.env.BASE_URL}/${route}`, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`)
    }
    const data = await res.json()

    const products = res.headers.get("x-wp-total")
    const pages = res.headers.get("x-wp-totalpages")
    console.log("products: ", products)
    console.log("pages: ", pages)

    return data
}

export const addWooComConfig = async (data = {}, route) => {

    const res = await fetch(`${process.env.BASE_URL}/${route}`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return res
}


export async function getProducts(limit, page = 1) {
    const url = `${process.env.BASE_URL}/products/?per_page=${limit}&page=${page}`
    const res = await fetch(url, {
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok)
        throw new Error("Requst faild: ", res.status)
    const data = await res.json()

    const products = res.headers.get("x-wp-total")
    const pages = res.headers.get("x-wp-totalpages")
    console.log("products: ", products)
    console.log("pages: ", pages)

    return data
}