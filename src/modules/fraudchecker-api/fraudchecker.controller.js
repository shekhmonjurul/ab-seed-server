import throwError from "../../utils/throwError.js"
import { response } from "../../utils/respones.js"
import { addAndGetFraudService } from "./fraudchecker.service.js"

export const addAndGetFraudController = async (req, res) => {
    const phone = req?.query?.phone
    throwError(!phone, "phone number are required")
    const data = await addAndGetFraudService(phone)
    throwError(!data, "frud ar not found")
    response(res, {
        data: data
    })
}

