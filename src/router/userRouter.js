const express = require("express");
const { userController } = require("../controller");
const { adminMiddleware } = require("../middleware");

const userRouter = express.Router();

// 토큰검증
userRouter.use("/", adminMiddleware.checkAuthorization);

// GET /api/v1/user/order
userRouter.get(
   "/order",
   
);

// GET /api/v1/user/mypage
userRouter.get("/mypage", );

// PUT /api/v1/user/mypage
userRouter.put("/mypage", );

module.exports = userRouter;