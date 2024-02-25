const mongoose = require("mongoose");
const { Schema } = mongoose;

// C: 오타입니다: userSchema
const userSChema = new Schema(
    {
        email: {
            type: String,
            required: true,
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

module.exports = userSChema;
