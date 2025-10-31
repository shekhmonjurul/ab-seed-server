import { use } from "react"
import { userDbConfig } from "../../config/database/user/user.database.config"
import dbConectionFunction from "../../utils/dbContectionFuntion"

const db = dbConectionFunction(userDbConfig)

// const userSql = `
//     CREATE TABLE IF NOT EXISTS users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     role ENUM('admin', 'employee', 'logistics') NOT NULL,
//     employeeId INT,
//     password VARCHAR(100) NOT NULL,
//     date_time CURRENT_TIMESTAMP
// );
// `
// const [row] = await db.execute(userSql)


const isertUserModel = async (user={}) => {

    const sql = `
    INSERT INTO users 
    (name, role, employeeId, password)
    VALUES (?, ?, ?, ?)
    `
    const [row] = await db.execute(sql, [user?.name, user?.role, user?.employeeId, user?.passwrod])
    return row
}