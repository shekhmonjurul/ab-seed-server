import { Router } from "express";
import { updateWeborder, getWebOrders, getWeborderbyID, statusCoutnController, createWebOrderController } from "./weborder.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js"

const router = Router();

router.put("/", updateWeborder);
router.get("/", getWebOrders);
router.get("/status_count", asyncHandler(statusCoutnController))
router.get("/:id", getWeborderbyID)


router.post("/create", asyncHandler(createWebOrderController))

export default router;
