import dotenv from "dotenv"
import * as FraudModel from "./fraudchecker.model.js"


dotenv.config()


export const getFraud = async (data) => {

    const apiKey = process.env.Fraud_Checker_Api;
    const phone = "01716550180";

    const fraud = await FraudModel.getFraudData(phone)

    console.log("fraud: ", fraud)

    if (phone) {
        if (fraud.length === 0) {
            const formData = new FormData();
            formData.append('phone', phone);

            const res = await fetch('https://fraudchecker.link/api/v1/qc/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`
                },
                body: formData
            })

            const currire = await res.json()
            const { mobile_number, total_parcels, total_delivered, total_cancel, apis } = currire

            const courierArray = Object.values(apis)?.map(c => ({
                courier_name: c.courier_name,
                total_parcels: Number(c.total_parcels),
                total_delivered_parcels: Number(c.total_delivered_parcels),
                total_cancelled_parcels: Number(c.total_cancelled_parcels)
            }));

            const reslut = await FraudModel.insert_fraud_checker([mobile_number, total_parcels, total_delivered, total_cancel])

            const currirehistory = await FraudModel.insert_fraud_courier_history(reslut.insertId, courierArray)

            console.log("reslut: ", reslut, "currier history: ", currirehistory)


            return { currire, reslut }
        } else {
            console.log("data: ", fraud)
            return { fraud }

        }
    } else {
        return { ok: false, mgs: 'Enter a phone number' }
    }

}


export const addFraud = async (data) => {
    const reslut = await FraudModel.insertFraud(data)
    return reslut
}
