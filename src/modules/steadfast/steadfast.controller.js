placingOrderControllelr, bulkOrderController, webhookController, currierStatusController


export const placingOrderControllelr = async(req, res, next)=>{
    try {
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

        if(!invoice && !recipientName && !recipientPhone && !recipientAddress && !codAmount){
            res.status(400).json({
                message: `invoice, recipientName, recipientPhone, recipientAddress, codAmount are required`,
                ok: false,
                status: 400,
                badreq: `Bad request`
            })
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
        if(!data){
            res.status(404).status({
                ok: false,
                data: data,
                status: 500,
                message: `Currier not submit: Internal Server Error`,
            })
        }

        res.status(200).json({
            message: "Currier create successfuly",
            status: 200,
            data: data,
        })

    } catch (error) {
        next(error)
    }
}

export const bulkOrderController = (req, res, next)=>{}
export const webhookController = (req, res, next)=>{}
export const currierStatusController = (req, res, next)=>{}