export const response = (res, resData = {}, statusCode = null) => res.status(statusCode || 200).json({
    ok: true,
    ...resData
})