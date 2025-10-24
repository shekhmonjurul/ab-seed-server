import db from "../../config/database/orders/orders.js";

export const insertOrder = async (orderData) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const {
      customer_name,
      phone,
      address,
      note,
      invoice,
      subtotal,
      delivery_charge,
      discount,
      advance,
      grand_total,
      items,

    } = orderData
    // 1. Insert into orders
    const [orderResult] = await conn.query(
      `INSERT INTO orders 
       (customer_name, phone, address, note, invoice, subtotal, delivery_charge, discount, advance, grand_total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        customer_name,
        phone,
        address,
        note,
        invoice,
        subtotal,
        delivery_charge,
        discount,
        advance,
        grand_total,
      ]
    );

    const orderId = orderResult.insertId;
    const invoice_new = Number(String(orderId).padStart(5, '0')) 
      await conn.execute("UPDATE orders SET invoice = ? WHERE id = ?", [orderId, invoice_new]);
    // 2️⃣ Insert each order item
    for (const item of items) {
      const [itemResult] = await conn.query(
        `INSERT INTO order_items 
         (order_id, name, product_id, quantity, price, subtotal, update_price)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.name,
          item.product_id || item?.id,
          item.quantity,
          item.price,
          item.subtotal,
          item.updateprice || item.price,
        ]
      );

      const itemId = itemResult.insertId;
  
      // 3️⃣ Insert images for each item
      console.log("item image type: ", typeof item.image)
      if (typeof item.image === "object") {
         await conn.query(`INSERT INTO item_images (order_item_id, src) VALUES (?, ?)`,
          [itemId, item?.image?.src])
      }else if(Array.isArray(item.image)){
        for (const img of item.image) {
          await conn.query(
            `INSERT INTO item_images (order_item_id, src) VALUES (?, ?)`,
            [itemId, img.src]
          );
        }
      }
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
  const sql = `
    SELECT 
      o.id AS order_id,
      o.customer_name,
      o.phone,
      o.address,
      o.note,
      o.invoice,
      o.subtotal,
      o.delivery_charge,
      o.discount,
      o.advance,
      o.grand_total,
      o.created_at,
      
      oi.id AS order_item_id,
      oi.name AS item_name,
      oi.product_id,
      oi.quantity,
      oi.price,
      oi.subtotal AS item_subtotal,
      oi.update_price,
      
      ii.id AS image_id,
      ii.src AS image_src

    FROM orders o
    LEFT JOIN order_items oi ON o.id = oi.order_id
    LEFT JOIN item_images ii ON oi.id = ii.order_item_id
    ORDER BY o.id DESC
  `;

  const [rows] = await db.query(sql);
  if (rows.length === 0) return [];

  const orders = [];
  const orderMap = new Map();

  for (const row of rows) {
    // 1️⃣ Order গুলো map করে push করা
    if (!orderMap.has(row.order_id)) {
      orderMap.set(row.order_id, {
        id: row.order_id,
        customer_name: row.customer_name,
        phone: row.phone,
        address: row.address,
        note: row.note,
        invoice: row.invoice,
        subtotal: row.subtotal,
        delivery_charge: row.delivery_charge,
        discount: row.discount,
        advance: row.advance,
        grand_total: row.grand_total,
        created_at: row.created_at,
        items: []
      });
      orders.push(orderMap.get(row.order_id));
    }

    const order = orderMap.get(row.order_id);

    // 2️⃣ Order item push করার জন্য check
    if (row.order_item_id) {
      let item = order.items.find(i => i.id === row.order_item_id);
      if (!item) {
        item = {
          id: row.order_item_id,
          name: row.item_name,
          product_id: row.product_id,
          quantity: row.quantity,
          price: row.price,
          subtotal: row.item_subtotal,
          update_price: row.update_price,
          images: []
        };
        order.items.push(item);
      }

      // 3️⃣ Item images push করা
      if (row.image_id) {
        item.images.push({
          id: row.image_id,
          src: row.image_src
        });
      }
    }
  }

  return orders;
};
