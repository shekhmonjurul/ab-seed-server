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
    const page = Number(req?.query?.page) || 1
    const limit = Number(req?.query?.limit) || 10
    console.log(page, limit)
    const offset = (page-1) * limit
    console.log("offset: ", offset)
    const {orders, totalPages, rowCount} = await OrderService.listOrders(limit, offset);
    res.json({ success: true, data: orders, totalPages, rowCount });
  } catch (err) {
    next(err);
  }
};
