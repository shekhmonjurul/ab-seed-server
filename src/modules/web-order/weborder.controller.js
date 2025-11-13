import * as webOrderService from "./weborder.service.js";
import { response } from "../../utils/respones.js"
import throwError from "../../utils/throwError.js";
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
    const { page, limit, status } = req?.query
    const orders = await webOrderService.getOrders(page, limit, status);
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

export const statusCoutnController = async (req, res) => {
  const count = await webOrderService.statusCoutnService()
  if (!count) throw new Error("No counting found")
  response(res, { data: count })
}


export const createWebOrderController = async (req, res) => {
  const body = req?.body || {}
  const order = {
    customer_name: body?.customername || "None",
    phone: body?.phone || null,
    address: body?.address || null,
    note: body?.note || "new order",
    invoice: body?.invoice || null,
    subtotal: body?.subtotal,
    delivery_charge: body?.deliverycharge || null,
    discount: body?.discount,
    advance: body?.advance,
    grand_total: body?.grandtotal || null,
    items: body?.items,
  }

  const result = await webOrderService.createWebOrderService(order)

  throwError(!result, "Order create faild")
  response(res, {
    data: result
  })
}