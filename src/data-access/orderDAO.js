const { Order } = require("./model");

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
   const orderUpdated = await Order.findByIdAndUpdate(id, {
      'shipping_info.recipient': shippingInfo.recipient,
      'shipping_info.phone_number': shippingInfo.phone_number,
      'shipping_info.postal_code' : shippingInfo.postal_code,
      'shipping_info.address': shippingInfo.address,
      'shipping_info.address_detail': shippingInfo.address_detail,
   }, {
      new: true
   }).lean();

   return orderUpdated;
  }
  
   //admin용 전체 주문내역 get
   async allOrders() {
      const orders = await Order.find({}).lean();
      return orders;
   }

   //admin용 주문 수정
   async updateOrderStatus(id, order_status) {
      const update_order = await Order.findByIdAndUpdate(
         id, 
         {order_status}, 
         {new: true}
      ).lean();

      return update_order;
   }

   //admin용 주문 삭제
   async deleteOrder(id) {
      const delete_order = await Order.findByIdAndDelete(id); //mongoose에는 deleteById 매서드는 없었다고 한다...
      return delete_order;
   }
}

module.exports = new OrderDAO();
