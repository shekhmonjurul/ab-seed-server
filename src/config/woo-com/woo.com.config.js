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

export async function getAll(urlInfo = {
    routename: "products",
    limit: 20,
    page: 1
}) {
    const url = `${process.env.BASE_URL}/${urlInfo?.routename}/?per_page=${urlInfo?.limit}&page=${urlInfo?.page}`
    const res = await fetch(url, {
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Content-Type': 'application/json'
        }
    })
    if (!res.ok)
        throw new Error("Requst faild: ", res.status)
    const data = await res.json()

    const allDetails = res.headers.get("x-wp-total")
    const pages = res.headers.get("x-wp-totalpages")
    console.log("All details: ", allDetails)
    console.log("pages: ", pages)

    return data
}