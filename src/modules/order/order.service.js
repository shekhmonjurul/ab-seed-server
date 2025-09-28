import * as OrderModel from "./order.model.js";

export const addOrder = async (data) => {
  if (!data.customer || !data.product) {
    throw new Error("Customer and product required");
  }
  return await OrderModel.insertOrder(data);
};

export const listOrders = async () => {
  return await OrderModel.getAllOrders();
};
