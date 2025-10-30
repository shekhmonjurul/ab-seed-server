export  function handelTryCatch(req, res, next, cb){
    try {
        cb(req, res)
    } catch (error) {
        next(error)
    }
 }