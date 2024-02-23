const express = require("express");
const { orderController } = require("../controller");

const orderRouter = express.Router();

// 주문 POST /api/v1/signup /api 이거 꼭 해야하나
orderRouter.post("/", orderController.postOrder);

// 조회 GET /api/v1/login
// req.params 객체를 통해 참조한 db document의 id는 동적 경로 매개변수
orderRouter.get("/:id", orderController.getOrder);

// 배송지 수정 PATCH /api/v1/login
orderRouter.patch("/:id", orderController.patchOrder);

module.exports = orderRouter;