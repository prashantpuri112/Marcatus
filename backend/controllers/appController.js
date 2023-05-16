import UserModel from '../model/UserModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js'
import otpGenerator from 'otp-generator';
import { passwordVerify, emailVerify } from "../utils/validate.js"
import stockCompData from '../model/StockCompModel.js'

/** middleware for verify user */
export async function verifyUser(req, res, next) {
    try {
        const { email } = req.method === "GET" ? req.query : req.body;
        // check the user existance
        let exist = await UserModel.findOne({ email });
        if (!exist) return res.status(400).send({ error: "Can't find User!" });
        next();
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: "Authentication Error" });
    }
}

export async function getUserByToken(req, res) {

    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token || token === 'null') {
            return res.status(400).send({ error: "Login Required!" })
        }

        const data = jwt.verify(token, ENV.JWT_SECRET);
        UserModel.findOne({ _id: data.userId }).then(function (result) {
            req.user = result;
            req.user.password = null
            return res.status(200).send({ user: result })
        }).catch((err) => {
            console.log(err)
        });
    }
    catch (e) {
        return res.status(400).send({ message: e, success: false })
    }
}

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {

    try {
        const { username, password, profile, email } = req.body;

        const passwordValidate = passwordVerify(password)
        if (passwordValidate) return res.status(400).send({ error: passwordValidate });

        const validateEmail = emailVerify(email)
        if (validateEmail) return res.status(400).send({ error: validateEmail });

        // check the existing user
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({ username }).then((user) => {
                if (user) return res.status(400).send({ error: "Username already exists." });

                resolve();
            })
        });

        // check for existing email
        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({ email }).then(function (email) {
                if (email) return res.status(400).send({ error: "Email already exists." });

                resolve();
            })
        });

        Promise.all([existUsername, existEmail])
            .then(() => {


                if (password) {
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {

                            const user = new UserModel({
                                username,
                                password: hashedPassword,
                                profile: profile || '',
                                email
                            });


                            // return save result as a response
                            user.save()
                                .then(result => res.status(200).send({ msg: "User Register Successfully" }))
                                .catch(error => res.status(400).send({ error }))

                        }).catch(error => {
                            return res.status(400).send({
                                error: "Enable to hashed password"
                            })
                        })
                }
            }).catch(error => {
                console.log(error)

                return res.status(400).send({ error })
            })


    } catch (error) {
        console.log(error)
        return res.status(400).send(error);
    }

}


/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {

    const { email, password } = req.body;

    try {
        UserModel.findOne({ email })
            .then(user => {
                console.log(user.is_admin)
                bcrypt.compare(password, user.password)
                    .then(passwordCheck => {

                        if (!passwordCheck) return res.status(400).send({ error: "Don't have Password" });

                        // create jwt token
                        const token = jwt.sign({
                            userId: user._id,
                            username: user.username,
                            email: user.email,
                            is_admin: user.is_admin
                        }, ENV.JWT_SECRET, { expiresIn: "24h" });

                        return res.status(200).send({
                            msg: "Login Successful...!",
                            username: user.username,
                            is_admin: user.is_admin,
                            token
                        });

                    })
                    .catch(error => {
                        return res.status(400).send({ error: "Password does not Match" })
                    })
            })
            .catch(error => {
                return res.status(404).send({ error: "Username not Found" });
            })

    } catch (error) {
        return res.status(500).send({ error });
    }
}


/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {

    const { email } = req.params;
    try {
        if (!email) return res.status(501).send({ error: "Invalid Username" });

        const us = await UserModel.findOne({ email })
        if (us) {
            us.password = null
            return res.status(200).send(us);
        } else {
            return res.status(501).send({ error: "Couldn't Find the User" });
        }
        // UserModel.findOne({ email }, function (err, user) {
        //     if (err) return res.status(500).send({ err });
        //     if (!user) return res.status(501).send({ error: "Couldn't Find the User" });

        //     return res.status(201).send(rest);
        // })

    } catch (error) {
        return res.status(404).send({ error: "Cannot Find User Data" });
    }

}


/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
export async function updateUser(req, res) {
    try {

        // const id = req.query.id;
        const { userId } = req.user;
        const user = await UserModel.findById(userId)

        function validateName(name) {
            const regex = /^[A-Za-z]{2,}$/;
            return regex.test(name);
        }

        if (user) {
            const { firstName, lastName, email, mobile, address, profile, password } = req.body

            if (mobile) {
                console.log(mobile.length)
                if (mobile.length !== 10) return res.status(400).send({ error: "Invalid phone number" });
            }

            if (firstName) {
                if (!validateName(firstName)) return res.status(400).send({ error: "Invalid first name" });
            }

            if (lastName) {
                if (!validateName(lastName)) return res.status(400).send({ error: "Invalid last name" });
            }

            if (email) {
                const validateEmail = emailVerify(email)
                if (validateEmail) return res.status(400).send({ error: validateEmail });
            }


            // update the data
            bcrypt.compare(password, user.password).then((hasPassword) => {

                if (!hasPassword) {
                    return res.status(400).send({ error: "Password does not match" });
                }

                UserModel.updateOne({ _id: userId }, { firstName, lastName, email, mobile, address, profile }).then(function (err, data) {


                    return res.status(200).send({ msg: "Record Updated...!" });
                })
            })

        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }

    } catch (error) {
        console.log(error)
        return res.status(401).send({ error: 'Unable to update user data.' });
    }
}


/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
    req.app.locals.OTP = await otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    res.status(200).send({ code: req.app.locals.OTP })
}


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
    const { code } = req.query;
    console.log(code)
    console.log(req.app.locals.OTP)
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null; // reset the OTP value
        req.app.locals.resetSession = true; // start session for reset password
        return res.status(200).send({ msg: 'Verify Successsfully!' })
    }
    return res.status(400).send({ error: "Invalid OTP" });
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        return res.status(201).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).send({ error: "Session expired!" })
}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
export async function resetPassword(req, res) {
    try {
        const { email, password } = req.body

        UserModel.findOne({ email }).then((user) => {
            if (user) {
                if (password) {
                    const validatePassword = passwordVerify(password)
                    if (validatePassword) {
                        return res.status(400).send({ error: validatePassword })
                    }
                    bcrypt.hash(password, 10)
                        .then(hashedPassword => {
                            UserModel.findByIdAndUpdate(user._id, { password: hashedPassword }).then((result) => {
                                return res.status(200).send({ message: "Password changes successfully" })
                            })
                        })
                }
            } else {
                return res.status(400).send({ error: "User not found" })
            }
        })
    } catch (error) {
        return res.status(400).send({ error })
    }
}


export async function changePassword(req, res) {
    try {

        const { userId } = req.user;
        const user = await UserModel.findById(userId)
        const { currentPassword, newPassword } = req.body

        if (user) {
            bcrypt.compare(currentPassword, user.password).then((hasPassword) => {
                if (!hasPassword) {
                    return res.status(400).send({ error: "Incorrect Password" });
                }

                const validatePassword = passwordVerify(newPassword)
                if (validatePassword) {
                    return res.status(400).send({ error: validatePassword })
                }

                bcrypt.hash(newPassword, 10)
                    .then(hashedPassword => {
                        UserModel.findByIdAndUpdate(user._id, { password: hashedPassword }).then((result) => {
                            return res.status(200).send({ message: "Password changed successfully" })
                        })
                    })
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: '' })
    }
}


