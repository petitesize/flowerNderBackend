const { userService } = require("../service");
const utils = require("../misc/utils");

const userController = {
   // 회원주문조회
   async getUserOrder(req, res, next) {
      try {
         const email = res.locals.user.email;
         const userOrder = await userService.getUserOrder(email);
         res.json(utils.buildResponse(userOrder));
      } catch (error) {
         next(error);
      }
   },

   // 회원정보조회(password 없음)
   async getUserInfo(req, res, next) {
      try {
         const userEmail = res.locals.user.email;
         const userInfo = await userService.getUserInfo(userEmail);
         res.json(utils.buildResponse(userInfo));
      } catch (error) {
         next(error);
      }
   },

   // 회원정보수정
   async patchUserInfo(req, res, next) {
      try {
         const userEmail = res.locals.user.email;
         // password 보내지 않기
         // email, phone_number 수정 못함
         const { email, password, user_name, phone_number, address, address_detail } = req.body;
         const user = await userService.updateUserInfo(userEmail, {
            email, password, user_name, phone_number, address, address_detail
         });
         res.json(utils.buildResponse(user));
      } catch (error) {
         next(error);
      }
   }
};

module.exports = userController;
