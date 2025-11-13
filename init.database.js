import sequelizeConfig, { mysqlConfig } from "./src/config/database/database.config.js";
import dbConectionFunction from "./src/utils/dbContectionFuntion.js";

const db = dbConectionFunction(mysqlConfig)
const initDB = async () => {
    try {
        await db.execute(`CREATE DATABASE IF NOT EXISTS ab_seed;`)
        console.log("Database create successfully!")

        await sequelizeConfig.authenticate()
        console.log("Database connected successfully!")

        await sequelizeConfig.sync({ alter: true })
        console.log("Tables synced successfully!")

    } catch (error) {
        console.error("DB initialization error: ", error)
    } finally {
        db.releaseConnection()
        sequelizeConfig.close()
    }
}

initDB()