const express = require("express");
const { productController } = require("../controller");
const { productMiddleware } = require("../middleware");

const productRouter = express.Router();

// GET /api/v1/products
productRouter.get("/", productController.getProducts);

// GET /api/v1/products/:productId
productRouter.get(
  "/:productId",
  // productMiddleware.checkProductIdFrom("path"), 
  productController.getProduct 
);

// GET /api/v1/products?category={category}
// C: 아래 get 라우트는 가장 위에 있는 라우트랑 중복이기 때문에 실행이 되지 않습니다. 위에 것을 사용해주세요.
productRouter.get(
  "/", 
  productMiddleware.checkProductCategoryFrom("query"), 
  productController.getProducts
); 

module.exports = productRouter;
