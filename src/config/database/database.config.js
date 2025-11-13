import { Sequelize } from "sequelize"
import { configDotenv } from "dotenv"

configDotenv()

const dbinfo = {
    database: process.env.DB_AB_SEED,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST
}

const sequelizeConfig = new Sequelize(dbinfo.database, dbinfo.username, dbinfo.password, {
    host: dbinfo.host,
    dialect: "mysql"
})

export const  mysqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST
}
export default sequelizeConfig