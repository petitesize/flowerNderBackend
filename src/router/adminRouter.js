const express = require("express");
const { 
   adminController, 
   productController 
} = require("../controller");
const {
  adminMiddleware,
  uploadMiddleware,
  productMiddleware,
} = require("../middleware");

const adminRouter = express.Router();

// 관리자 : /api/v1/admin
adminRouter.use(
  "/",
  adminMiddleware.checkAuthentication,
  adminMiddleware.checkAdminPermission,
);

// 관리자 회원조회 : GET /api/v1/admin/users
adminRouter.get("/users", adminController.getUsers);

// 관리자 주문조회 : GET /api/v1/admin/orders
adminRouter.get("/orders", adminController.getOrders);

// 관리자 주문수정 : PATCH /api/v1/admin/orders/:order_id
adminRouter.patch("/orders/:id", adminController.patchOrder);

// 관리자 주문삭제 : DELETE /api/v1/admin/orders/:order_id
adminRouter.delete("/orders/:id", adminController.deleteOrder);

// 관리자 상품조회 : GET /api/v1/admin/products
adminRouter.get("/products", productController.getProducts);

// 관리자 상품추가 : POST /api/v1/admin/products
adminRouter.post(
  "/products",
//   productMiddleware.checkCompleteProductFrom("body"),
  uploadMiddleware.upload, // postProduct 실행 전 file 타입 및 갯수 검증 -> 이미지 파일을 메모리에 저장 -> req.files에 파일 정보를 추가
  productController.postProduct,
);

// 관리자 상품수정 : PUT /api/v1/admin/products/product_id
adminRouter.put(
  "/products/:id",
  // productMiddleware.checkCompleteProductFrom("body"),
  uploadMiddleware.upload,
  productController.putProduct,
);

// 관리자 상품삭제 : DELETE /api/v1/admin/products/product_id
adminRouter.delete(
  "/products/:id",
  productMiddleware.checkProductIdFrom("params"),
  productController.deleteProduct,
);

module.exports = adminRouter;
