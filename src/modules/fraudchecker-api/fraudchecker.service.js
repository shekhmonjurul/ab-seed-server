import fetchData from "../../utils/fetch.data.js"
import {
    FraudCheckerModel,
    FraudCourierHistoryModel
} from "./fraudchecker.model.js"

import {
    fraudEndPoint,
    fraudApiOtion
} from "../../config/fraud/fraud.config.js"

import throwError from "../../utils/throwError.js"


async function addAndGetFraudService(phone) {
    let isFraud = await isHaveFraud(phone)
    if (!isFraud) {
        const create = await createFraud(phone)
        throwError(!create, "Fraud create faild")
        isFraud = await isHaveFraud(phone)
    }
    return isFraud
}


async function createFraud(phone) {

    const frauData = await fraudChecker(phone)

    const {
        mobile_number,
        total_parcels,
        total_delivered,
        total_cancel,
        courierArray
    } = frauData

    const fraud = await FraudCheckerModel.create({
        mobile_number: mobile_number,
        total_parcels: total_parcels,
        total_delivered: total_delivered,
        total_cancel: total_cancel,
    })

    throwError(!fraud, "fraud crate faild")

    const fraudHistorys = courierArray?.map((c => ({
        fraud_id: fraud.fraud_id,
        courier_name: c.courier_name,
        total_parcels: c.total_parcels,
        total_delivered_parcels: c.total_delivered_parcels,
        total_cancelled_parcels: c.total_cancelled_parcels,
    })))

    const historys = await FraudCourierHistoryModel.bulkCreate(fraudHistorys)

    throwError(!historys, "Fraud historys create faild")
    return fraud

}

async function isHaveFraud(phone) {
    const fraud = await FraudCheckerModel.findOne({
        where: { phone },
        include: [
            {
                model: FraudCourierHistoryModel,
                as: "couriers",
                attributes: [
                    "courier_name",
                    "total_parcels",
                    "total_delivered_parcels",
                    "total_cancelled_parcels"
                ],
            },
        ],
    })

    return fraud

}

async function fraudChecker(phone) {
    const formData = new FormData()
    formData.append('phone', phone)

    const fraudData = await fetchData(fraudEndPoint, {
        ...fraudApiOtion,
        body: formData
    })

    throwError(!fraudData, "user are not found on fraud api")

    const { mobile_number, total_parcels, total_delivered, total_cancel, apis } = fraudData

    const courierArray = Object.values(apis)?.map(c => ({
        courier_name: c.courier_name,
        total_parcels: Number(c.total_parcels),
        total_delivered_parcels: Number(c.total_delivered_parcels),
        total_cancelled_parcels: Number(c.total_cancelled_parcels)
    }))

    return {
        mobile_number,
        total_parcels,
        total_delivered,
        total_cancel,
        courierArray
    }
}

export default {
    addAndGetFraudService
}