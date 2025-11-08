
import { userDbConfig } from "../../config/database/user/user.database.config.js"
import dbConectionFunction from "../../utils/dbContectionFuntion.js"

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


export const isertUserModel = async (name, password, role, employeId) => {
    const sql = `
    INSERT INTO users 
    (name, role, employeeId, password)
    VALUES (?, ?, ?, ?)
    `
    const [row] = await db.execute(sql, [name, role, employeId, password])


    return row
}

export const getUserModel = async (employeeId) => {
    const sql = `
    SELECT * FROM users
    WHERE employeeId=? 
    `
    const [reslut] = await db.query(sql, [employeeId])
    return reslut
}