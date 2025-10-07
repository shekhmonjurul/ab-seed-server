import * as woocomConfig from "../../config/woo-com/woo.com.config.js";
import * as WebOrderModel from "./weborder.model.js";

export const updateOrder = async (data) => {
  if (!data.customer || !data.product) {
    throw new Error("Customer and product required");
  }

  try {
    // const res = await api().put("orders/id", {})

    return res
  } catch (error) {
    console.log("error: ", error)
  }

};

export const getOrders = async () => {
  try {
    // WooCommerce uses Basic Auth
    const orders = await woocomConfig.getAll({
      routename: "orders",
      limit: 10,
      page: 1
    })

    const orderInfo = orders.map((data, index) => {
      const { id, billing, date_created_gmt, customer_note, line_items, payment_method } = data
      console.log("shippinge lines: ", line_items)
      return { id, billing, date_created_gmt, customer_note, line_items, payment_method }
    })

    return orderInfo
  } catch (err) {
    console.error("Error fetching orders:", err.message);
  }
  // return await WebOrderModel.getOrders();
};

export const getWebOrdersServiceById = async (orderid) => {
  const route = `orders/${orderid}`
  const order = await woocomConfig.getSingelWoocomConfig(route)
  const {id, status, billing, line_items} = await order
  const orderdetais = {
    id,
    status, 
    billing,
    line_items
  }
  return orderdetais
}













