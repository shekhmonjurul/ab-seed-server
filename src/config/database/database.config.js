import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv()


const dbinfo = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_AB_SEED
}

const sequelizeConfig = new Sequelize(dbinfo.database, dbinfo.user, dbinfo.password, {
    host: dbinfo.host,
    dialect: "mysql"
})

export default sequelizeConfig