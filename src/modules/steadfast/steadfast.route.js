import { Router } from "express";
import {placingOrderControllelr, bulkOrderController, webhookController, currierStatusController} from "./steadfast.controller.js"
const router = Router()


router.post("/placing_order", placingOrderControllelr)
router.post("/bulk_order", bulkOrderController)
router.post("/webhook", webhookController)
router.get("/status", currierStatusController)

export default router