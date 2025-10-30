import { Router } from "express";
import { createOrder, getOrders, statusCountController, statusController, updateStatusContorller } from "./order.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/status_count", asyncHandler(statusCountController))
router.get("/order_status", asyncHandler(statusController))
router.post("/update_status", asyncHandler(updateStatusContorller))
export default router;
