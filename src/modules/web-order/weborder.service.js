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
      const res = await woocomConfig.getWoocomConfig("orders")

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json()

    const mapArr = data.map((data, index) => {
      const { billing, date_created_gmt, customer_note, line_items } = data
      console.log("shippinge lines: ", line_items)
      return {billing, date_created_gmt, customer_note, line_items}
    })

    return mapArr
  } catch (err) {
    console.error("Error fetching orders:", err.message);
  }
  // return await WebOrderModel.getOrders();
};













