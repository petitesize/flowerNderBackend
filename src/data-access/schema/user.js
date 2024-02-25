const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSChema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true, //mongoDB가 제공하는 중복 회피 체크 기능
        },        
        password: {
            type: String,
            required: true,
        },
        user_name: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        address_detail: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        collection: "User",
        versionKey: false,
        timestamps: true, 
    }
)

module.exports = userSchema;