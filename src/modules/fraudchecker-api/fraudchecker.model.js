import db from "../../config/database";


export const insertFraud = async (data) => {
    const sql = `
    INSERT INTO fraud_checker 
    (customerName, customerPhone, orders, delivered, cancelled, rating, currireHistory) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
    const [results, fields] = await db.execute(sql, data.values)
    return results

}

export const getFraudData = async (number) => {
    const sql = 'SELECT * FROM `table` WHERE `customerPhone` = ?'
    const [results, fields] = await db.execute(sql, number)
    return results
}
