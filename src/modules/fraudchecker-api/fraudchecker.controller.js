import * as fraudService from "./fraudchecker.service.js"

export const getFraudchecker = async (req, res, next) => {
    try {
        const body = req?.body
        const currire = await fraudService.getFraud(body);
        // const currire = await res_currire.json()
        res.status(201).json({ success: true, currire });
    } catch (err) {
        next(err);
    }
};




export const addFraudchecker = async (req, res, next) => {
    try {
        const body = req?.body 
        const reslut = await fraudService.addFraud(body)
        res.status(201).json({ success: true, reslut })
    } catch (err) {
        next(err)
    }

}

