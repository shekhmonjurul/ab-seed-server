import { Router } from "express";
import orderController from "./order.controller.js"
import { asyncHandler } from "../../utils/asyncHandler.js";

const {
    createOrderController,
    updateStatusContorller,
    getOrderController,
    statusCountController
} = orderController

const router = Router();

router.get("/", asyncHandler(getOrderController));
router.get("/status_count", asyncHandler(statusCountController))
router.post("/create", asyncHandler(createOrderController))
router.post("/update_status", asyncHandler(updateStatusContorller))

export default router;
