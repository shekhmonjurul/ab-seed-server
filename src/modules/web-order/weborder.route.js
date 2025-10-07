import { Router } from "express";
import { updateWeborder, getWebOrders, getWeborderbyID } from "./weborder.controller.js";

const router = Router();

router.put("/", updateWeborder);
router.get("/", getWebOrders);
router.get("/:id", getWeborderbyID)

export default router;
