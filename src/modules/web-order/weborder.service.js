import * as woocomConfig from "../../config/woo-com/woo.com.config.js";
import throwError from "../../utils/throwError.js";
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

export const getOrders = async (page, limit, status) => {
  try {
    // WooCommerce uses Basic Auth
    const urlInfo = {
      routename: "orders",
      page: page || 1,
      limit: limit || 10,
      status: status || "processing"
    }
    const url = `${urlInfo?.routename}/?status=${urlInfo?.status}&per_page=${urlInfo?.limit}&page=${urlInfo?.page}`
    const orders = await woocomConfig.getAll(url)

    const orderInfo = orders?.data?.map((data, index) => {
      const { id, status, billing, date_created_gmt, customer_note, line_items, payment_method } = data
      return { id, status, billing, date_created_gmt, customer_note, line_items, payment_method }
    })

    return { orderInfo, page: orders?.pages, rowCount: orders?.rowsCount }
  } catch (err) {
    console.error("Error fetching orders:", err.message);
  }
  // return await WebOrderModel.getOrders();
};

export const getWebOrdersServiceById = async (orderid) => {
  const route = `orders/${orderid}`
  const order = await woocomConfig.getSingelWoocomConfig(route)
  const { id, status, billing, line_items } = await order
  const orderdetais = {
    id,
    status,
    billing,
    line_items
  }
  return orderdetais
}


export const statusCoutnService = async () => {
  const statuses = [
    "pending",
    "processing",
    "on-hold",
    "completed",
    "cancelled",
    "refunded",
    "failed"
  ]

  const urlInfo = {
    routename: "orders",
    limit: 10,
    page: 1,
  }

  const result = {}

  for (const status of statuses) {
    const url = `${urlInfo?.routename}/?status=${status}&per_page=${urlInfo?.limit}&page=${urlInfo?.page}`
    const res = await woocomConfig.getAll(url)
    result[status] = res?.rowsCount
  }

  return result

}


export const createWebOrderService = async (order)=>{
  
}









