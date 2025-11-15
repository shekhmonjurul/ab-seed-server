import express from "express"
import { loginController, registrationController, createUserContoller } from "./user.controller.js"
import {asyncHandler} from "../../utils/asyncHandler.js"
const router = express.Router()

router.post("/registation", asyncHandler(registrationController))
router.post("/login", asyncHandler(loginController))
router.post("/", asyncHandler(createUserContoller))


export default router