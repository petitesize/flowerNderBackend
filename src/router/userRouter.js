const express = require("express");
const { userController } = require("../controller");
const { adminMiddleware } = require("../middleware");

const userRouter = express.Router();

// 토큰검증 /api/v1/user/
userRouter.use("/", adminMiddleware.checkAuthorization);

// 회원주문조회 GET /api/v1/user/order
userRouter.get("/order", userController.getUserOrder);

// 회원정보조회 GET /api/v1/user/mypage
userRouter.get("/mypage", userController.getUserInfo);

// 회원정보수정 PATCH /api/v1/user/mypage?id={id}
userRouter.patch("/mypage", userController.patchUserInfo);

module.exports = userRouter;