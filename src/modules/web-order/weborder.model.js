import db from "../../config/database/fraud/database.js";

export const updateOrder = async (data) => {
  const sql = `INSERT INTO weborders (customerid,	time,	customerStatus,	customer,	note,	products,	successRate,	tags,	site) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

  const [result] = db.query(sql, data)
  return result.insertId;
};

export const getOrders = async () => {
  const sql = "SELECT * FROM weborders"
  const [rows] = await db.query(sql);
  return rows;
};
