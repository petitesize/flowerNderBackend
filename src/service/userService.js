const { userDAO } = require("../data-access");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

class UserService {
   // 회원정보조회(password, isAdmin 없음)
   async getUserInfo(userEmail) { 
      const userInfo = await userDAO.findByEmail(userEmail);
      const { password, isAdmin, ...userInfoWithoutSensitive } = userInfo;
      return userInfoWithoutSensitive;
   }

   // 회원정보수정
   async updateUserInfo(userEmail, { email, password, user_name, phone_number, address, address_detail }) {
      const updatedUserInfo = await userDAO.updateById(userEmail, { email, password, user_name, phone_number, address, address_detail });
      if (updatedUserInfo === null) {
         throw new AppError(
         commonErrors.resourceNotFoundError,
         "해당 상품이 존재하지 않습니다",
         404
         );
      }
      return updatedUserInfo;
   }

   // 회원주문조회
   // async getUserOrder(email) { 
   //    const userOrder = await userDAO.findByEmail(email);
   //    return userOrder;
   // }

   // 회원탈퇴
   // async deleteProduct(id) {
   //    const deletedProduct = await productDAO.deleteOne(id);
   //    if (deletedProduct === null) {
   //       throw new AppError(
   //       commonErrors.resourceNotFoundError,
   //       "해당 상품이 존재하지 않습니다",
   //       404
   //       );
   //    }
   //    return deletedProduct;
   // }
}

module.exports = new UserService();