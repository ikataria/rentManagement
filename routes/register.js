const dbRegistration = require('../models/registration')

module.exports = (req, res) => {
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
}