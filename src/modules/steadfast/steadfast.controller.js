import { handelTryCatch } from "../../utils/handel.try.catch"
import { errorResponse, successResponse } from "../../utils/respones"

export const placingOrderControllelr = async (req, res, next) => {
  handelTryCatch(req, res, next, async(req, res)=>{
     const {
            invoice,
            recipientName,
            recipientPhone,
            alternativePhone,
            recipientEmail,
            recipientAddress,
            codAmount,
            note,
            itemDescription,
            totalLot,
            deliveryType
        } = req?.body || {}

        if (!invoice && !recipientName && !recipientPhone && !recipientAddress && !codAmount) {
            const json = {
                message: `invoice, recipientName, recipientPhone, recipientAddress, codAmount are required`,
                ok: false,
                status: 400,
                badreq: `Bad request`
            }
          return  errorResponse(res, 400, json)
        }

        const body = {
            invoice,
            recipientName,
            recipientPhone,
            alternativePhone,
            recipientEmail,
            recipientAddress,
            codAmount,
            note,
            itemDescription,
            totalLot,
            deliveryType
        }
        const data = await placingOrderService(body)
        if (!data) {
          return  errorResponse(res, 500, {
                ok: false,
                data: data,
                status: 500,
                message: `Currier not submit: Internal Server Error`,
            })
        }

      return successResponse(res, 200, {
            message: "Currier create successfuly",
            status: 200,
            data: data,
        })
  })
}

export const bulkOrderController = async (req, res, next) => {
    handelTryCatch(req, res, next, async(req, res)=>{
        const { bulkorders } = req?.body || []
        if (bulkorders.length === 0) {
           return errorResponse(res, 400, {
                message: "Plese create a list of currier orders",
                ok: false,
                status: 400
            })
        }
        const data = await bulkOrderService(bulkorders)
        if (!data) {
           return errorResponse(res, 500, {
                message: "Internal server error",
                status: 500,
                data: data
            })
        }
       return successResponse(res, 200, {
            message: 'create currier order list successfuly',
            status: 500,
            ok: true
        })
    })
}
export const webhookController = (req, res, next) => { }

export const currierStatusController = (req, res, next) => {
    handelTryCatch(req, res, next, async (req, res) => {
        const { search } = req?.query
        if (!search) {
            return errorResponse(res, 400, {
                ok: false,
                message: "id / tarcking id/ order id requierd",
                status: 400
            })
        }
        const data = await currierStatusService(search)
        if (!data) {
            return errorResponse(res, 404, {
                message: "Data not found",
                ok: false,
                status: 404
            })
        }
        return successResponse(res, 200, {
            message: "All data recive successfuly",
            ok: true,
            data: data
        })
    })
}

