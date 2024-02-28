const express = require("express");
const { orderController } = require("../controller");
const { orderMiddleware } = require("../middleware");

const orderRouter = express.Router();

// 주문 POST /v1/signup /api 이거 꼭 해야하나
orderRouter.post("/", orderController.postOrder);

// 조회 GET /v1/login
// req.params 객체를 통해 참조한 db document의 id는 동적 경로 매개변수
orderRouter.get(
  "/:id",
  orderMiddleware.checkOrderIdFrom("params"),
  orderController.getOrder,
);

// 배송지 수정 PATCH /v1/login
orderRouter.patch(
  "/shipping/:id",
  orderMiddleware.checkOrderIdFrom("params"),
  orderController.patchShippingInfo,
);

// 주문 취소 요청  PATCH /v1/login
orderRouter.patch(
  "/cancel/:id",
  orderMiddleware.checkOrderIdFrom("params"),
  orderController.patchCancelReq,
);

module.exports = orderRouter;
