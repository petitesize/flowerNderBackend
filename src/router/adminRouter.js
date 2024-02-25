const express = require("express");
const { adminController } = require("../controller");
// const { postMiddleware, commentMiddleware } = require("../middleware");

const adminRouter = express.Router();

// 관리자 메인 : GET /api/v1/admin
// adminRouter.get("/", adminController.get);

// 관리자 회원조회 : GET /api/v1/admin/users
adminRouter.get("/", adminController.getUsers);

// 관리자 주문조회 : GET /api/v1/admin/orders
adminRouter.get("/", adminController.getOrders);

// 관리자 주문수정 : PATCH /api/v1/admin/orders/:order_id
adminRouter.patch("/:order_id", adminController.patchOrder);

// 관리자 주문삭제 : DELETE /api/v1/admin/orders/:order_id
adminRouter.delete("/:order_id", adminController.deleteOrder);

// 관리자 상품조회 : GET /api/v1/admin/products
adminRouter.get("/", adminController.getProducts );

// 관리자 상품추가 : POST /api/v1/admin/products
adminRouter.post("/", adminController.postProduct);

// 관리자 상품수정 : PUT /api/v1/admin/products/product_id
adminRouter.put("/:product_id", adminController.putProduct);

// 관리자 상품삭제 : DELETE /api/v1/admin/products/product_id
adminRouter.delete("/:product_id", adminController.deleteProduct);

module.exports = authRouter;