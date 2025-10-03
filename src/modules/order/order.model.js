import db from "../../config/database/fraud/database.js";

export const insertOrder = async (orderData) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Insert into orders
    const [orderResult] = await conn.query(
      `INSERT INTO orders (pid, orderId, time, orderStatus, note, code, site) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        orderData.pid,
        orderData.orderid,
        orderData.time,
        orderData.orderStatus,
        orderData.note,
        orderData.code,
        orderData.site
      ]
    );

    const orderId = orderResult.insertId;

    // 2. Insert customer
    await conn.query(
      `INSERT INTO customers (order_id, name, number, address) 
       VALUES (?, ?, ?, ?)`,
      [
        orderId,
        orderData.customer.name,
        orderData.customer.number,
        orderData.customer.address
      ]
    );

    // 3. Insert products
    for (const p of orderData.products) {
      await conn.query(
        `INSERT INTO products (order_id, productName, price) 
         VALUES (?, ?, ?)`,
        [orderId, p.productname, p.price]
      );
    }

    await conn.commit();
    console.log("Order Inserted Successfully ✅");
    return orderResult
  } catch (err) {
    await conn.rollback();
    console.error("Insert Failed ❌", err);
  } finally {
    conn.release();
  }
};

export const getAllOrders = async () => {
  const [rows] = await db.query(`
    SELECT 
      o.id as order_id,
      o.pid,
      o.orderId,
      o.time,
      o.orderStatus,
      o.note,
      o.code,
      o.site,
      c.name as customer_name,
      c.number as customer_number,
      c.address as customer_address,
      p.id as product_id,
      p.productName,
      p.price
    FROM orders o
    LEFT JOIN customers c ON o.id = c.order_id
    LEFT JOIN products p ON o.id = p.order_id
    ORDER BY o.id DESC
  `);

  if (rows.length === 0) return [];

  const orders = [];
  const orderMap = new Map();

  for (const row of rows) {
    if (!orderMap.has(row.order_id)) {
      orderMap.set(row.order_id, {
        pid: row.pid,
        orderid: row.orderId,
        time: row.time,
        orderStatus: row.orderStatus,
        note: row.note,
        code: row.code,
        site: row.site,
        customer: {
          name: row.customer_name,
          number: row.customer_number,
          address: row.customer_address
        },
        products: []
      });
      orders.push(orderMap.get(row.order_id));
    }

    // যদি প্রোডাক্ট থাকে তাহলে products array এ push করবো
    if (row.product_id) {
      orderMap.get(row.order_id).products.push({
        productname: row.productName,
        price: row.price
      });
    }
  }

  return orders;
};