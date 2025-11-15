import { Router } from "express";
import {asyncHandler} from "../../utils/asyncHandler.js"
import fraudService from "./fraudchecker.service.js"


const {addAndGetFraudController} = fraudService

const router = Router();

router.get("/", asyncHandler(addAndGetFraudController));

export default router;

// endpoint: get---> /api/fraudchecker?phone=01xxxxxxxxx  | find a phone number is fraud or no