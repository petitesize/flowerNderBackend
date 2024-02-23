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
         const {_id, customer_info} = req.body;
         const foundOrder = await orderService.getOrder(
            _id, 
            customer_info.name, 
            customer_info.email
         );

         res.json(utils.buildResponse(foundOrder));
      } catch (e) {
         next(e);
      }
   },
   
   async patchOrder(req, res, next) {
      try {
         const { _id, shipping_info } = req.body;
         const updatedOrder = await orderService.updateOrder( _id, shipping_info);

         res.status(200).json(utils.buildResponse(updatedOrder));
      } catch (e) {
         next(e);
      }
   },
};

module.exports = orderController;
