const express = require("express");
const { adminController } = require("../controller");
const { adminMiddleware } = require("../middleware");

const { productController } = require("../controller");
const { productMiddleware } = require("../middleware");

const adminRouter = express.Router();

// 관리자 : /api/v1/admin
adminRouter.use(
   "/", 
   adminMiddleware.checkAuthorization,
   adminMiddleware.checkAdminPermission,
);

// 관리자 회원조회 : GET /api/v1/admin/users
adminRouter.get(
   "/users", 
   adminController.getUsers,
);

// 관리자 주문조회 : GET /api/v1/admin/orders
adminRouter.get(
   "/orders", 
   adminController.getOrders
);

// 관리자 주문수정 : PATCH /api/v1/admin/orders/:order_id
adminRouter.patch(
   "/orders/:id",
   adminController.patchOrder
);

// 관리자 주문삭제 : DELETE /api/v1/admin/orders/:order_id
adminRouter.delete(
   "/orders/:id",
   adminController.deleteOrder
);

// 관리자 상품조회 : GET /api/v1/admin/products
adminRouter.get("/products", productController.getProducts);

// 관리자 상품추가 : POST /api/v1/admin/products
adminRouter.post(
   "/products", 
   productMiddleware.checkCompleteProductFrom("body"), 
   productController.postProduct
);

// 관리자 상품수정 : PUT /api/v1/admin/products/product_id
adminRouter.put(
   "/products/:productId", 
   productMiddleware.checkCompleteProductFrom("body"),
   productController.putProduct
);

// 관리자 상품삭제 : DELETE /api/v1/admin/products/product_id
adminRouter.delete(
   "/products/:productId", 
   productMiddleware.checkProductIdFrom("params"),
   productController.deleteProduct
);

module.exports = adminRouter;