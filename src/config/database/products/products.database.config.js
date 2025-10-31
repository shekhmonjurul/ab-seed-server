import { configDotenv } from "dotenv"
import dbConfigFuntion from "../../../utils/dbConfigFunction.js"
configDotenv()

export const productsdbConfig = dbConfigFuntion("products")