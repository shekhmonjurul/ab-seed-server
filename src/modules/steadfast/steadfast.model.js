import dbConectionFunction from "../../utils/dbContectionFuntion.js"
import { dbSteadfastConfig } from "../../config/steadfast/currier.log.database.js"

const db = dbConectionFunction(dbSteadfastConfig)

export const insertCurrierModel = async (order = {}) => {
    const sql = `
        INSERT INTO order_status(phone_number, invoice_id, currier_id, currier_status)
        VALUES (?, ?, ?, ?)
    `
    return query(sql, [order.recipient_phone, order.invoice, order.tracking_code, order.status])
}
export const getCurrierModel = async (search = "") => {


    const sql = !search ? `select * from order_status` : `
  SELECT * FROM order_status 
  WHERE invoice_id = ? 
     OR phone_number = ? 
     OR currier_id = ?
`
console.log("sql: ", sql, "search: ", search);

    return query(sql, [search, search, search])
}
export const updateCurrierModel = async (update = {}) => {
    const { order_status, order_id, tracking_code } = update
    const sql = `
    update order_status
    set currier_status = ?
    where invoice_id = ? or where currier_id = ?
    `
    return query(sql, [order_status, order_id, tracking_code])
}


async function query(sql, value = []) {
    const [result] = value ? await db.query(sql, value) : await db.query(sql)
    db.releaseConnection()
    if (!result) return
    return result
}