const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true, //mongoDB가 제공하는 중복 회피 체크 기능
            validate: [isEmail, '올바른 이메일 형식이 아닙니다.'],
        },        
        password: {
            type: String,
            required: true,
            minlength: [8, '최소 8글자 이상으로 비밀번호를 설정해주세요.'],
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