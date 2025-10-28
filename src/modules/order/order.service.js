import * as OrderModel from "./order.model.js";

export const addOrder = async (data) => {
  const order = {
    customer_name: data?.customername || "None",
    phone: data?.phone || null,
    address: data?.address || null,
    note: data?.note || "new order",
    invoice: data?.invoice || null,
    subtotal: data?.subtotal,
    delivery_charge: data?.deliverycharge || null,
    discount: data?.discount,
    advance: data?.advance,
    grand_total: data?.grandtotal || null,
    items: data?.items,
  }
  return await OrderModel.insertOrder(order);
};

export const listOrders = async (limit, offset) => {
  return await OrderModel.getAllOrders(limit, offset);
};
