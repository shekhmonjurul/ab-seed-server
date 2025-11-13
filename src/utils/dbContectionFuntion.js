import mysql from "mysql2/promise"

const dbConectionFunction = (config={host: "", user: "", password: "", database: ""}) => {
   return mysql.createPool({
        host: config?.host,
        user: config?.user,
        password: config?.password,
    });
   
}

export default dbConectionFunction;