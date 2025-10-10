import { fetchData } from "../../utils/fetch.data"
import { steadfastConfig, checkCurrierStatus } from "../../config/steadfast/steadfast.api"

const {endpoints: {cteateorder, bulkorders}} = steadfastConfig

export const placingOrderService = async (order) => {
    const {path, method} = cteateorder
    const data = await steadfastApiCall(path, method, order)
    if(!data)return
    const {consignment:{recipient_phone, consignment_id, invoice, tracking_code, recipient_name, status, note, created_at, updated_at}} = data
    const dbdata = {recipient_name, recipient_phone, consignment_id, invoice, tracking_code, recipient_name, status, note, created_at, updated_at}
    const dbres = await createCurrierModel(dbdata)
    if(!dbres)return
    return dbres
}
export const bulkOrderService = (orders) => { }
export const currierStatusService = (search) => { }
export const webhookService = (currier = {}) => { }


async function steadfastApiCall(endpoint, method, currier) {
    const {baseurl, apikey, secretkey} = steadfastConfig
    const data = await fetchData(`${baseurl}${endpoint}`, {
        method: method,
        headers: {
            "Api-Key": apikey,
            "Secret-Key": secretkey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(currier)
    })
    return data
}