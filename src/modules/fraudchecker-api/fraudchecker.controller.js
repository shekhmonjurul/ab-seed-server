import * as fraudService from "./fraudchecker.service.js"

export const getFraudchecker = async (req, res, next) => {
    try {
        const body = req?.body
        const res_currire = await fraudService.getFraud(body);
        const currire = await res_currire.json()
        res.status(201).json({ success: true, currire });
    } catch (err) {
        next(err);
    }
};



const currireHistory = JSON.stringify([
    { date: "2025-09-20", status: "ordered" },
    { date: "2025-09-21", status: "delivered" },
    { date: "2025-09-22", status: "cancelled" }
]);

const values = [
    "Rahim Uddin",   // customerName
    "01712345678",   // customerPhone
    10,              // orders
    8,               // delivered
    2,               // cancelled
    4.5,             // rating
    currireHistory   // JSON

];

const data = {
    currireHistory, //object
    values //arry
}
export const addFraudchecker = async (req, res, next) => {
    try {
        const body = req?.body || data
        const reslut = await fraudService.addFraud(body)
        res.status(201).json({ success: true, reslut })
    } catch (err) {
        next(err)
    }

}

