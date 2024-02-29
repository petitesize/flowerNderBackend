const express = require("express");
const { userController } = require("../controller");
const { adminMiddleware } = require("../middleware");

const userRouter = express.Router();

// 토큰검증 /api/v1/user/
userRouter.use("/", adminMiddleware.checkAuthorization);

// 회원주문조회 GET /api/v1/user/order
userRouter.get("/order", userController.getUserOrder);

// '../mypage'였던 것들 헷갈릴까봐 me로 수정
// 회원정보조회 GET /api/v1/user/me
userRouter.get("/me", userController.getUserInfo);

// 회원정보수정 PATCH /api/v1/user/me
userRouter.patch("/me", userController.patchUserInfo);

// 회원정보삭제 DELETE /api/v1/user/me
userRouter.delete("/me", userController.deleteUserInfo);

module.exports = userRouter;
