import * as OrderService from "./order.service.js";

export const createOrder = async (req, res, next) => {
  try {
    const orderId = await OrderService.addOrder(req.body);
    res.status(201).json({ success: true, orderId });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.listOrders();
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};
