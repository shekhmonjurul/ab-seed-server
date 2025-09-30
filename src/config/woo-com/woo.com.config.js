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

    return res
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