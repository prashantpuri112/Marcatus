export function passwordVerify(values) {
    /* eslint-disable no-useless-escape */
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (!values) {
        return "Password Required...!";
    } else if (values.includes(" ")) {
        return "Wrong Password...!";
    } else if (values.length < 4) {
        return "Password must be more than 4 characters long";
    } else if (!specialChars.test(values)) {
        return "Password must have special character";
    }
}

/** validate email */
export function emailVerify(values) {
    if (!values) {
        return "Email Required...!";
    } else if (values.includes(" ")) {
        return "Wrong Email...!"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)) {
        return "Invalid email address...!"
    }
}