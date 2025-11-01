import { Router } from "express"
import { getProducts, addProduct, searchProductController, addProductController, addCatagoryController } from "./products.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js"
import fileUpload from "../../config/file_upload/file.upload.config.js"

const router = Router()


router.get("/", searchProductController, getProducts)

// router.post("/", addProduct)
router.post("/add", fileUpload.array("files"), asyncHandler(addProductController))
router.post("/catagory", asyncHandler(addCatagoryController))
export default router