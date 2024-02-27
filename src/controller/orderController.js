const { orderService } = require("../service");
const utils = require("../misc/utils");

const orderController = {
   async postOrder(req, res, next) {
      try {
         const { order_items, customer_info, shipping_info} = req.body;
         const newOrder = await orderService.placeOrder({
            orderItems: order_items, 
            customerInfo: customer_info, 
            shippingInfo: shipping_info, 
         });

         res.status(201).json(utils.buildResponse(newOrder));
      } catch (e) {
         next(e);
      }
   },

   async getOrder(req, res, next) {
      try {
        // api 경로 매개변수에서 ID 추출
        const { id } = req.params;
        // 입력받은 쿼리 매개변수에서 정보 추출
        const { name, email } = req.query;
         const foundOrder = await orderService.getOrder(
            id, 
            name, 
            email
         );

         res.json(utils.buildResponse(foundOrder));
      } catch (e) {
         next(e);
      }
   },
   
   async patchOrder(req, res, next) {
      try {
         const { id } = req.params;
         const { shipping_info } = req.body;
         const updatedOrder = await orderService.updateOrder( id, shipping_info);

         res.status(200).json(utils.buildResponse(updatedOrder));
      } catch (e) {
         next(e);
      }
   },
};

module.exports = orderController;
