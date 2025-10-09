import { configDotenv } from "dotenv";

configDotenv()

const { DB_STEDFAST_CURRIER, DB_HOST, DB_USER, DB_PASS} = process.env

export const dbSteadfastConfig = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database:  DB_STEDFAST_CURRIER,
}