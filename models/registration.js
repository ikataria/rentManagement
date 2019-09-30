const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    SGID: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    phoneVerify: {
        otp: Number,
        verified: Boolean,
        verifiedAt: Date
    },
    emailVerify: {
        otp: Number,
        verified: Boolean,
        verifiedAt: Date
    },
    status: Number,
    aadharCardNo: {
        type: Number,
        required: true,
        unique: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('registers', RegisterSchema)