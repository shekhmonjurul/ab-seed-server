import db from "../../config/database.js";

export const createOrder = async (data) => {
  const [result] = await db.query(
    "INSERT INTO orders (customer, product, amount) VALUES (?, ?, ?)",
    [data.customer, data.product, data.amount]
  );
  return result.insertId;
};

export const getOrders =  async() => {
  const [rows] = await db.query("SELECT * FROM orders");
  return rows;
};
