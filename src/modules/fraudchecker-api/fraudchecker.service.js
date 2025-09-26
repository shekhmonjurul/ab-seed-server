import dotenv from "dotenv"
import * as FraudModel from "./fraudchecker.model.js"


dotenv.config()


export const getFraud = async (data) => {

    const apiKey = process.env.Fraud_Checker_Api;
    const phone = data?.number;
    const fraud = await FraudModel.getFraudData()

    if (phone) {
        if(!fraud){
             const formData = new FormData();
        formData.append('phone', phone);

        const res = await fetch('https://fraudchecker.link/api/v1/qc/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`
            },
            body: formData
        })
        return res
        }else{
              return {data}
        }
    }else{
        return {ok: false, mgs: 'Enter a phone number'}
    }
}


export const addFraud = async (data)=>{
    const reslut = await FraudModel.insertFraud(data)
    return reslut
}


