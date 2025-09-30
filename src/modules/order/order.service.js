import * as OrderModel from "./order.model.js";

export const addOrder = async (data) => {
  // if (!data?.customer || !data?.product) {
  //   throw new Error("Customer and product required");
  // }

  const newOrder = {
  pid: "P123",
  orderid: "ORD-456",
  time: "2025-09-28 15:00:00",
  orderStatus: "pending",
  note: "Urgent delivery",
  code: "XYP-900",
  site: "example.com",
  customer: {
    name: "Rahim",
    number: "01711111111",
    address: "Dhaka, Bangladesh"
  },
  products: [
    { productname: "T-Shirt", price: 500 },
    { productname: "Jeans", price: 1200 }
  ]
};

  return await OrderModel.insertOrder(newOrder);
};

export const listOrders = async () => {
  return await OrderModel.getAllOrders();
};
