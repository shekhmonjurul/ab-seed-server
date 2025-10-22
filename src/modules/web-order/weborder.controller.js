import * as webOrderService from "./weborder.service.js";

export const updateWeborder = async (req, res, next) => {
  try {
    const result = await webOrderService.updateOrder(req.body);
    res.status(201).json({ success: true, result });
  } catch (err) {
    next(err);
  }
};

export const getWebOrders = async (req, res, next) => {
  try {
    const {page, limit} = req?.query
    const orders = await webOrderService.getOrders(page, limit);
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export const getWeborderbyID = async (req, res, next) => {
  try {
    const id = req.params?.id
    const order = await webOrderService.getWebOrdersServiceById(id)
    if (order) {
      res.status(200).json({
        massege: `success -- id: ${id}`,
        status: 200,
        order
      })
    } else {
      res.status(404).json({
        status: 404,
        massege: `Order not found: ${id}`
      })
    }
  } catch (error) {
    console.log("error: ", error)
    next(error)
  }
}
