import dbConectionFunction from "../../utils/dbContectionFuntion.js"
import { dbSteadfastConfig } from "../../config/steadfast/currier.log.database.js"

const db = dbConectionFunction(dbSteadfastConfig)

export const insertCurrierModel = async (order = {}) => {
    const sql = `
        INSERT INTO orders (phone_number, invoice_id, currier_id, currier_status)
        VALUES (?, ?, ?, ?)
    `
    return query(sql, [order.recipient_phone, order.invoice, order.tracking_code, order.status])
}
export const getCurrierModel = async (search = "") => {
    const sql = search ? `select * from orders` : `select * from orders where invoice_id = ${search} or phone_number = ${search} or currier_id = ${search} `
    return query(sql)
}
export const updateCurrierModel = async (update = {}) => {
    const sql = `
    update orders
    set currier_status = ${update.order_status}
    where invoice_id = ${order_id} or where currier_id = ${tracking_code}
    `
    return query(sql)
}


async function query(sql, value = "") {
    const [result] = value ? await db.query(sql, value) : await db.query(sql)
    db.releaseConnection()
    if (!result) return
    return result
}