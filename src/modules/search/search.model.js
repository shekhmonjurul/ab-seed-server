// import db from "../../config/database/orders/orders.js"

export const getFilterModel = async (filterword) => {
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
      WHERE o.invoice LIKE ? OR o.phone LIKE ?
      ORDER BY o.id DESC
    `;

    const [rows] = await db.query(sql, [`%${filterword}%`, `%${filterword}%`]);

    // 🔹 Data restructure part
    const ordersMap = new Map();

    rows.forEach(row => {
      if (!ordersMap.has(row.order_id)) {
        ordersMap.set(row.order_id, {
          order_id: row.order_id,
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
      }

      ordersMap.get(row.order_id).items.push({
        order_item_id: row.order_item_id,
        item_name: row.item_name,
        product_id: row.product_id,
        quantity: row.quantity,
        price: row.price,
        image_src: row.image_src
      });
    });

    const formattedOrders = Array.from(ordersMap.values());

    return formattedOrders
}