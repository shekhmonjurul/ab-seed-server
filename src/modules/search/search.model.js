import db from "../../config/database/orders/orders.js"

export const getFilterModel = async (filterword) => {
    const sql = ` SELECT * FROM orders WHERE order_id LIKE '%${Number(filterword)}%'
    OR number LIKE '%${filterword}%'`
    const [filterorders] = await db.query(sql)
    return filterorders
}