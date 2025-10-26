import { handelTryCatch } from "../../utils/handel.try.catch.js"
import { errorResponse, successResponse } from "../../utils/respones.js"
import { placingOrderService, bulkOrderService, currierStatusService, webhookService } from "./steadfast.service.js"

export const placingOrderControllelr = async (req, res, next) => {
    handelTryCatch(req, res, next, async (req, res) => {
        const {
            invoice,
            recipient_name,
            recipient_phone,
            alternative_phone,
            recipient_email,
            recipient_address,
            cod_amount,
            note,
            item_description,
            total_lot,
            delivery_type
        } = req?.body || {}
        console.log("body: ", req.body)
        if (!invoice && !recipient_name && !recipient_phone && !recipient_address && !cod_amount) {
            const json = {
                message: `invoice, recipientName, recipientPhone, recipientAddress, codAmount are required`,
                ok: false,
                status: 400,
                badreq: `Bad request`
            }
            return errorResponse(res, 400, json)
        }

        const body = {
            invoice,
            recipient_name,
            recipient_phone,
            alternative_phone,
            recipient_email,
            recipient_address,
            cod_amount,
            note,
            item_description,
            total_lot,
            delivery_type
        }
        const data = await placingOrderService(body)
        if (!data) {
            return errorResponse(res, 500, {
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
    handelTryCatch(req, res, next, async (req, res) => {
        const { bulkorders } = req?.body 
        if (bulkorders?.length === 0) {
            return errorResponse(res, 400, {
                message: "Plese create a list of currier orders",
                ok: false,
                status: 400
            })
        }
        const {dbresponses, message, status} = await bulkOrderService(bulkorders)
        if (!dbresponses) {
            return errorResponse(res, 500, {
                message: "Internal server error",
                message,
                status: 500,
                data: data
            })
        }
        return successResponse(res, 200, {
            message: 'create currier order list successfuly',
            status: 200,
            ok: true
        })
    })
}
export const webhookController = (req, res, next) => {
    handelTryCatch(req, res, next, async(req, res)=>{
        const {order_id, order_status, tracking_code, updated_at} = req.body
        const data = await webhookService({order_id, order_status, tracking_code, updated_at})
        if(!data){
           return errorResponse(res, 500, {
                message: "web hook porssing faild",
                ok: false,
                status: 500
            })
        }
       return successResponse(res, 200, {
            message: "web hook prossecing successfuly",
            ok: true,
            status: 200,
            data
        })
    })
 }

export const currierStatusController = (req, res, next) => {
    handelTryCatch(req, res, next, async (req, res) => {
        const { search } = req?.query
        const data = await currierStatusService(search)
        console.log("data: ", data, 'query: ', search);
        
        if (data.length === 0) {
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
