import { response } from "../../utils/respones.js";
import orderService from "./order.service.js"
import throwError from "../../utils/throwError.js"

const {
  createOrderService,
  updateStatusSevice,
  getOrderService,
  getOrderServiceByStatus,
  getStatusCountService
} = orderService


// send response the all order
const getOrderController = async (req, res) => {
  const status = req?.query?.status || "Pending"
  const limit = req?.query?.limit || 10
  const page = req?.query?.page || 1

  const offset = (page - 1) * limit
  const orders = !status ? await getOrderService(limit, offset) : await getOrderServiceByStatus(status, limit, offset)

  throwError(!orders, "No orders found")

  response(res, { data: orders })
}

// update order status by status
const updateStatusContorller = async (req, res) => {
  const orderId = req?.query?.orderId
  const status = req?.query?.status
  throwError(!orderId && !status, "order id and status required")
  const message = await updateStatusSevice(orderId, status)
  throwError(!message, "Status update faild")
  response(res, { data: message })
}

// count order status
const statusCountController = async (req, res) => {
  const counts = await getStatusCountService()
  throwError(!counts, "No counts find on orders data base")
  response(res, { data: counts })
}

// create order
const createOrderController = async (req, res) => {
  const body = req?.body
  const data = await createOrderService(body)
  throwError(!data, "Order create faild")
  response(res, {
    data: data
  })

}


export default {
  createOrderController,
  updateStatusContorller,
  getOrderController,
  statusCountController
}