const { orderDAO } = require("../data-access");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

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
         throw new AppError(
            commonErrors.inputError,
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
           commonErrors.inputError,
           "주문 내역 조회 중 에러",
           400
         )
      }  
      return order;
   }

   // 주문 (배송 관련 정보) 변경 서비스
   async updateOrder(id, shippingInfo) {
      try {
         const orderUpdated = await orderDAO.updateShippingInfo(id, shippingInfo);
         return orderUpdated;
      } catch(e) {
         throw new AppError(
            commonErrors.inputError,
            "주문 배송정보 업데이트 중 에러",
            400
         )
      }
   }

}

module.exports = new orderService();
