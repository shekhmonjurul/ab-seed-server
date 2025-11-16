import throwError from "./throwError"

export default function requestBodyRequiredCheckFunction(body, unrequiredLogic) {
    const keys = Object.keys(body || {})

    for (const key of keys) {

        if (unrequiredLogic) {
            throwError(!body[key], `${key} field ar requied`)
        }

    }
}


// this funtion check requset body data are required or not. mean body is undefine or null value

// @params=body | this is req.body er data
// @params=unrequiredLogic | this params is which value are not requied