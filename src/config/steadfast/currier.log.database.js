import { configDotenv } from "dotenv";
configDotenv()

const { DB_STEDFAST_CURRIER} = process.env

export const dbSteadfastConfig = {
    steadfastdb:  DB_STEDFAST_CURRIER,
}