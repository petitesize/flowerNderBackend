const express = require("express");
const { authController } = require("../controller");
// const { postMiddleware, commentMiddleware } = require("../middleware");

const authRouter = express.Router();

// 회원가입 : POST /api/v1/auth/signup
authRouter.post("/signup", authController.postSignUp);

// 로그인 : POST /api/v1/auth/login
authRouter.post("/login", authController.postSignIn);

module.exports = authRouter;
