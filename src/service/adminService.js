const { userDAO } = require("../data-access");
const { orderDAO } = require("../data-access");
const AppError = require("../misc/AppError");
const { resourceNotFoundError, databaseError } = require('../misc/commonErrors');
const commonErrors = require("../misc/commonErrors");

class adminService {
   async getUsers() {
      const users = await userDAO.allUsers();
      if(!users.length === 0) {
         throw new AppError(
            resourceNotFoundError.inputError,
            "회원목록이 없음",
            404
         )
      }
      return users
   };

   async getOrders() {
      const orders = await orderDAO.allOrders();
      if(!orders.length === 0) {
         throw new AppError(
            resourceNotFoundError.inputError,
            "주문내역이 없음",
            404
         )
      }
      return orders
   };

   async updateOrder(id, order_status) {
      try {
         const update_order = await orderDAO.updateOrderStatus(id, order_status);
         return update_order;
      } catch(e) {
         console.log(e);
         throw new AppError(
            databaseError.inputError,
            "주문내역 수정 중 에러",
            400
         )
      }
   };

   async deleteOrder(id) {
      try {
         const delete_order = await orderDAO.deleteOrder(id);
         return { message: "주문이 성공적으로 삭제되었습니다." };
      } catch(e) {
         console.log(e);
         throw new AppError(
            databaseError.inputError,
            "주문내역 삭제 중 에러",
            400
         )
      }
   };
}

module.exports = new adminService();
