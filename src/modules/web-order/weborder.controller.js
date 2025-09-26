import * as webOrderService from "./weborder.service.js";

export const updateWeborder = async (req, res, next) => {
  try {
    const result = await webOrderService.updateOrder(req.body);
    res.status(201).json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

export const getWebOrders  = async (req, res, next) => {
  try {
    const orders = await webOrderService.getOrders();
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};
 