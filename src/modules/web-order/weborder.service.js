import * as WebOrderModel from "./weborder.model.js";
import Buffer from "buffer"
import { configDotenv } from "dotenv";

configDotenv()



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
    const credentials = Buffer.Buffer.from(`${process.env.ConsumerKey}:${process.env.ConsumerSecret}`).toString('base64');

    const res = await fetch(`${process.env.BASE_URL}/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log(data); // সব অর্ডার আসবে
    return data
  } catch (err) {
    console.error("Error fetching orders:", err.message);
  }
  // return await WebOrderModel.getOrders();
};



