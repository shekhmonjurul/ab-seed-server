
export const successResponse = (res, status=200, json={},)=>{
 return res.status(status).json({...json})
}

export const errorResponse = (res, status=400, json={})=>{
    return res.status(status).json({...json})
}