import { configDotenv } from "dotenv"
configDotenv()

const {STEADFAST_BASE_URL, STEADFAST_SECRET_KEY, STEADFAST_API_KEY } = process.env

export const steadfastConfig = {
    baseurl: STEADFAST_BASE_URL,
    apikey: STEADFAST_API_KEY,
    secretkey: STEADFAST_SECRET_KEY,
    endpoints: {
        cteateorder: {
            path: "/create_order",
            method: "post"
        },
        bulkorders: {
            path: "/create_order/bulk-order",
            method: "post"
        },
    }
}

export const checkCurrierStatus = (code) => {
    return {
        method: "get",
        id: `/status_by_cid/${code}}`,
        invoice: `/status_by_invoice/${code}`,
        trackingcode: `/status_by_trackingcode/${code}`
    }
}

