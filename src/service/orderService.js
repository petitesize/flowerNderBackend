const { orderDAO } = require("../data-access");
const AppError = require("../misc/AppError");
const { resourceNotFoundError, databaseError } = require('../misc/commonErrors');

class orderService {
   // 주문 서비스
   async placeOrder({ orderItems, customerInfo, shippingInfo}) {
      // 일단 모든 주문 착불(배송비 0)이지만 추후 배송비 입력 원할경우를 위해 변수 만들어 놓음
      const deliveryFee = 0;
      // 배열로 받은 orderItems의 각 가격*수량+배송비 계산해서 더하기
      const orderAmount = orderItems.reduce((sum, item) => sum += item.quantity*item.total_amount, deliveryFee)
      
      try {
         const order = await orderDAO.create({
            orderAmount,
            orderItems,
            customerInfo,
            shippingInfo,            
         })
         return order;
      } catch (e) {
         console.log(e);
         throw new AppError(
            databaseError.inputError,
            "주문 생성 중 에러",
            400
         )
      }
   }
   
   // 주문 조회 서비스
   async getOrder(id, name, email) {
      const order = await orderDAO.findOrder(
         id, 
         name,
         email
      );
      if(!order) {
         throw new AppError(
           resourceNotFoundError.inputError,
           "주문 내역 조회 중 에러",
           400
         )
      }  
      return order;
   }

   // 주문 (배송 관련 정보) 변경 서비스
   async updateShippingInfo(id, shipping_info) {
      try {
         const orderUpdated = await orderDAO.updateShippingInfo(id, shipping_info);
         return orderUpdated;
      } catch(e) {
         console.log(e);
         throw new AppError(
            databaseError.inputError,
            "주문 배송지 업데이트 중 에러",
            400
         )
      }
   }

   // 유저 주문취소 요청
   async updateCancelReq(id, cancel_req) {
      try {
         const orderUpdated = await orderDAO.updateCancelReq(id, cancel_req);
         return orderUpdated;
      } catch(e) {
         console.log(e);
         throw new AppError(
            databaseError.inputError,
            "주문 취소 수정 중 에러",
            400
         )
      }
   }

}

module.exports = new orderService();
