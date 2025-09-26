import * as WebOrderModel from "./weborder.model.js";

export const updateOrder = async (data) => {
  if (!data.customer || !data.product) {
    throw new Error("Customer and product required");
  }
  return await WebOrderModel.updateOrder(data);
};

export const getOrders = async () => {
  return await WebOrderModel.getOrders();
};
