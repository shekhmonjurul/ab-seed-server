import * as WebOrderModel from "./weborder.model.js";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { configDotenv } from "dotenv";

configDotenv()

const api = () => {
  return new WooCommerceRestApi({
    url: process.env.URL,
    consumerKey: process.env.ConsumerKey,
    consumerSecret: process.env.ConsumerSecret,
    version: "wc/v3"
  })
}

export const updateOrder = async (data) => {
  if (!data.customer || !data.product) {
    throw new Error("Customer and product required");
  }

  try {
    const res = await api().put("orders/id", {})

    return res
  } catch (error) {
    console.log("error: ", error)
  }

};

export const getOrders = async () => {


  api().get("/orders").then((res) => {
    return res.data
  })
  return await WebOrderModel.getOrders();
};
