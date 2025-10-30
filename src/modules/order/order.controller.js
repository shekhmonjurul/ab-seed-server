import { response } from "../../utils/respones.js";
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
    const offset = (page - 1) * limit
    const { orders, totalPages, rowCount } = await OrderService.listOrders(limit, offset);
    res.json({ success: true, data: orders, totalPages, rowCount });
  } catch (err) {
    next(err);
  }
};

export const statusCountController = async (req, res) => {
  const counts = await OrderService.getStatusCountService()
  if (!counts) {
    throw new Error("No counts find on orders data base")
  }
  response(res, {data: counts})
}

export const statusController = async (req, res)=>{
  const status = req?.query?.status || "Pending"
  const limit = req?.query?.limit || 10
  const page = req?.query?.page || 1

  const offset = (page - 1) * limit

  const statusData = await OrderService.getStatusService(status, limit, offset)
  if(!statusData){
    throw new Error("Order not found")
  }
  response(res, {data: statusData})
}

export const updateStatusContorller = async (req, res)=>{
  const orderId = req?.query?.orderId
  const status = req?.query?.status
  if(!orderId && !status){
    throw new Error("order id and status required")
  }
  const message = await OrderService.updateStatusSevice(orderId, status)
  if(!message){
    throw new Error("Status update faild")
  }
  response(res, {data: message})
}