import { configDotenv } from "dotenv"
configDotenv()
export const userDbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    database: "usr"
}