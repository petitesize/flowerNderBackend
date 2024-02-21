const mongoose = require("mongoose");
const { Schema } = mongoose;

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