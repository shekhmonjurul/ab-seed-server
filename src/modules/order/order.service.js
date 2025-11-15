import { where } from "sequelize";
import OrderModel from "../../../models/index.js"
import sequelizeConfig from "../../config/database/database.config.js"

const {
  Order,
  OrderItem,
  OrderItemImage
} = OrderModel



// get all order
const getOrderService = async (limit, offset) => {
  const orders = await Order.findAll({
    include: [
      {
        model: OrderItem,
        as: "items",
        include: [
          {
            model: OrderItemImage,
            as: "images"
          }
        ]
      }
    ],
    order: [['createdAt', 'DESC']],
    limit: limit,
    offset: offset

  })

  return orders
}

// get order by status
const getOrderServiceByStatus = async (status, limit, offset) => {
  const orders = await Order.findAll({
    where: { status: status },
    include: [
      {
        model: OrderItem,
        as: "items",
        include: [
          {
            model: OrderItemImage,
            as: "images"
          }
        ]
      }
    ],
    order: [['createdAt', 'DESC']],
    limit: limit,
    offset: offset

  })

  return orders
}

// get status count 
const getStatusCountService = async () => {
  const counts = await Order.findAll({
    attributes: [
      'status',
      [Sequelize.fn('COUNT', Sequelize.col('status')), 'number']
    ],
    group: ['status']
  })

  const status = counts?.reduce((status, current) => {
    const data = current.toJSON()
    status[data?.status] = parseInt(data?.number || 0)
    return status
  }, {})


  return {
    Pending: status?.pending || 0,
    RTS: status?.rts || 0,
    Shipped: status?.shipped || 0,
    Delivered: status?.delivered || 0,
    Pending_Return: status?.pending_return || 0,
    Returned: status?.returned || 0,
    Partial: status?.partial || 0,
    Cancelled: status?.cancelled || 0,
    Pending_Cancel: status?.pending_cancel || 0,
    Preorder: status?.preorder || 0,
    Lost: status?.lost || 0
  }

}

// update order status
const updateStatusSevice = async (orderId, status) => {
  const data = await Order.update(
    {
      status: status
    },
    {
      where: {
        order_id: orderId
      }
    }
  )

  return data
}

// create order
const createOrderService = async (orderData) => {
  const transaction = sequelizeConfig.transaction()
  const { items, ...orderFields } = orderData
  const order = await Order.create(orderFields, { transaction: transaction })
  const new_invoice = String(order.id).padStart(5, "0")
  await order.update({ invoice: new_invoice }, { transaction: transaction })

  for (const item of items) {
    const oderItem = await OrderItem.create({
      ...item,
      order_id: order.id,
      update_price: item?.update_price || item?.price,
    }, { transaction: transaction })

    if (item.image && typeof item.image === "object") {
      await OrderItemImage.create({
        order_item_id: oderItem.id,
        src: item.image.src
      }, { transaction })
    }

    if (Array.isArray(item.image)) {
      const imagesData = item.images.map(img => ({
        order_item_id: oderItem.id,
        src: img.src
      }))
      await OrderItemImage.bulkCreate(imagesData, { transaction })
    }
  }

  await transaction.commit()
  return order
}


export default {
  createOrderService,
  updateStatusSevice,
  getOrderService,
  getOrderServiceByStatus,
  getStatusCountService
}
