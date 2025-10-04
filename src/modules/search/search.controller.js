import {getFilterService} from "./search.service.js"

export const getFilterController = async (req, res, next) => {
    try {
        const filterword = req.params?.filterword
        if (!filterword) {
            return res.status(400).json({
                status: 400,
                message: "Invalid search query provided."
            })
        }
        const filterorders = await getFilterService(filterword)
        if (filterorders.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "Orders not found"
            })
        }
        res.status(200).json({
            status: 200,
            message: "All orders here",
            filterorders
        })
    } catch (error) {
        next(error)
    }
}