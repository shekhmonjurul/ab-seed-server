import { Router } from "express";
import { updateWeborder, getWebOrders } from "./weborder.controller.js";

const router = Router();

router.put("/", updateWeborder);
router.get("/", getWebOrders);

export default router;
