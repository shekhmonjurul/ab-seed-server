import { Router } from "express"
import {getProducts, addProduct, searchProductController} from "./products.contoller.js"

const router = Router()

router.get("/", searchProductController, getProducts)
router.post("/", addProduct)

export default router