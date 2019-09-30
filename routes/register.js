const dbRegistration = require('../models/registration')
const jwt = require('jsonwebtoken')

/**
 *  Validate all fields
 * if all details are recieved then
 * Check wether he has registered before
 * Generate new OTP
 * Generate new tenant ID
 * save all details
 * Send OTP 
 */

module.exports = (req, res) => {
    try {
        console.log('body data >>>>>>>>>>>>>>>>>>>>', req.body)
        let token = jwt.sign({ phone: req.body.phone })
        dbRegistration.findOne({ status: { $in: [-1, -2] } }, (err, registerData) => {
            if (err) {
                res.json({
                    success: false,
                    msg: "Error in processing"
                })
            } else if (!registerData || registerData == null) {
                new dbRegistration({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    aadharCardNo: req.body.aadharCardNo,
                    status: 0,
                    phoneVerify: {
                        otp: generateOTP(),
                        verified: false,
                    },
                    emailVerify: {
                        otp: generateOTP(),
                        verified: false
                    }
                }).save((err, savedData) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: "Server Error. Please try again after some time."
                        })
                    } else {
                        console.log('registered data>>>>****>*>*>*>*>', savedData)

                    }
                })
            }
        })
        if (!req.body.firstName || !req.body.lastName) {
            res.json({
                success: false,
                msg: "Enter complete data"
            })
        } else {
            let newRegister = new dbRegistration({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phone: req.body.phone,
                aadharCardNo: req.body.aadharCardNo
            })
            newRegister.save((err, data) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: "Something went wrong"
                    })
                } else {
                    res.json({
                        success: true,
                        msg: "data saved",
                        data: data
                    })
                }
            })
        }

    } catch (err) {

    }
}