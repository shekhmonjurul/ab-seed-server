import { response } from "../../utils/respones.js";
import throwError from "../../utils/throwError.js";
import { loginService, registationServer } from "./user.service.js"


export let registrationController = async (req, res) => {
    let { name, password, role, employeId } = req.body;
    throwError(!name && !password && !role, "all fields required")
    let result = await registationServer(name, password, role, employeId)
    response(res, {data : result})
}

export const loginController = async (req, res) => {
    let { password, employeeId } = req.body;
    throwError( !password && !employeeId, 'name,employeId, password and role are required')
    const token = await loginService(password, employeeId)
    throwError(!token, 'Invalid user id and password')
    console.log("token: ", token)
    // res.cookies(token)
    response(res, { data: token })
}





