const mongoose = require("mongoose");
const { Order } = require("./model");
const utils = require("../misc/utils");

class OrderDAO {
   async create({ orderItems, customerInfo, shippingInfo, deliveryFee }) {
   // 일단 모든 주문 착불(배송비 0)이지만 추후 배송비 입력 원할경우를 위해 변수 만들어 놓음
   deliveryFee = 0; 

   // 배열로 받은 orderItems의 각 가격*수량+배송비 계산해서 더하기
   const orderAmount = orderItems.reduce((sum, item) => {
      sum += item.quantity*item.total_amount
      return sum
   }, 0)
   orderAmount = orderAmount + deliveryFee;

   //주문일 생성 후 Order모델 객체 생성
   const orderDate = new Date().toISOString();
   const order = await Order.create({
      order_amount: orderAmount,
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
   });
   if (!order) {
      throw new Error('주문을 찾을 수 없음');
   }
   return order.toObject();
  }

  async updateShippingInfo(id, shippingInfo) {
   const orderUpdated = await Order.findByIdAndUpdate(id, {
      'shipping_info.recipient': shippingInfo.recipient,
      'customer_info.phone_number': shippingInfo.phone_number,
      'shipping_info.address': shippingInfo.address,
      'shipping_info.address_detail': shippingInfo.address_detail,
   }, {
      new: true
   });
   if (!orderUpdated) {
      throw new Error('주문을 수정할 수 없음');
   }
   return orderUpdated.toObject();
  }
}

module.exports = new OrderDAO();
