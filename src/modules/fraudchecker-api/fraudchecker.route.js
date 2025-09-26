import { Router } from "express";
import * as fraudContorller from "./fraudchecker.controller.js"


const router = Router();

router.get("/", fraudContorller.getFraudchecker);
router.post("/", fraudContorller.addFraudchecker)

export default router;