import mysql from "mysql2/promise"

const dbConectionFunction = (config={host: "", user: "", password: "", database: ""}) => {
    mysql.createPool({
        host: config?.host,
        user: config?.user,
        password: config?.password,
        database: config?.database
    });
}

export default dbConectionFunction;