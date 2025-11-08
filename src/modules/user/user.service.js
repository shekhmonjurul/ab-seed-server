import jwt from "jsonwebtoken"
import bcrypt, { hash } from "bcrypt"
import { getUserModel, isertUserModel } from './user.model.js'
import throwError from "../../utils/throwError.js";
import { loginController } from "./user.controller.js";

export let registationServer = async (name, password, role, employeId) => {

    bcrypt.hash(password, 10, async function (err, hash) {

        let newUser = await isertUserModel(name, hash, role, employeId)
    });
}

export const loginService = async (password, employeeId) => {
    const usr = await getUserModel(employeeId)
    throwError(!usr, "User not found")
    const isMatch = bcrypt.compare(password, usr[0].password)
    throwError(!isMatch, "Invalid password")
    const payload = {
        id: usr.id,
        role: usr.role,
        name: usr.name
    }
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    })

    return token
}


