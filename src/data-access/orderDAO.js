const mongoose = require("mongoose");
const { Order } = require("./model");
const utils = require("../misc/utils");

class OrderDAO {
   async create({ orderAmount, orderItems, customerInfo, shippingInfo }) {
   //주문일 생성 후 Order모델 객체 생성
   const orderDate = new Date().toISOString();
   const order = await Order.create({
      order_amount: orderAmount, //?
      order_status: '입금확인중',
      order_date: orderDate,
      pay_method: '무통장입금',
      order_items: orderItems,
      customer_info: customerInfo,
      shipping_info: shippingInfo,
   });
   await order.save();

   return order.toObject();
  }
  
  async findOrder(id, name, email) {
   const order = await Order.findOne({
      _id: id,
      'customer_info.name': name,
      'customer_info.email': email,
   }).lean(); //데이터 빠른 찾기 + 자바스크립트의 일반 객체(plain JavaScript object)로 바로 반환

   return order;
  }

  async updateShippingInfo(id, shippingInfo) {
     // C: find*로 시작되는 메서드들은 toObject가 아닌 lean으로 POJO로 바꿔줘야 합니다.
   const orderUpdated = await Order.findByIdAndUpdate(id, {
      'shipping_info.recipient': shippingInfo.recipient,
      'customer_info.phone_number': shippingInfo.phone_number,
      'shipping_info.address': shippingInfo.address,
      'shipping_info.address_detail': shippingInfo.address_detail,
   }, {
      new: true
   });

   // C: 위의 코드를 .lean()으로 가져오게 되면 .toObject()는 필요없습니다. 사실 아래 코드는 .toObject 함수가 없다는 에러가 날거에요...
   return orderUpdated.toObject();
  }
}

module.exports = new OrderDAO();
