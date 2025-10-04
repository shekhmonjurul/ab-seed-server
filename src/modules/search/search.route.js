import { Router } from "express";
import {getFilterController} from "./search.controller.js"
const router = Router()

router.get("/:filterword", getFilterController)

export default router