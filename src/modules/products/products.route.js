import { Router } from "express"
import { getProducts, addProduct, searchProductController, addProductController, addCatagoryController } from "./products.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

const router = Router()

router.get("/", searchProductController, getProducts)
// router.post("/", addProduct)
router.post("/add", asyncHandler(addProductController))
router.post("/catagory", asyncHandler(addCatagoryController))
export default router