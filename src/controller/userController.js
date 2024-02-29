const { userService } = require("../service");
const utils = require("../misc/utils");

const userController = {
  // 회원주문조회
  async getUserOrder(req, res, next) {
    try {
      const userEmail = res.locals.user.email;
      const userOrder = await userService.getUserOrder(userEmail);
      res.json(utils.buildResponse(userOrder));
    } catch (error) {
      next(error);
    }
  },

  // 회원정보조회(password, isAdmin 없음)
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
      const { password, new_password, user_name, address, address_detail, postal_code } = req.body;
      const user = await userService.updateUserInfo(userEmail, {
        plainPassword: password,
        new_password,
        user_name,
        address,
        address_detail,
        postal_code,
      });
      res.json(utils.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  // 회원정보삭제
  async deleteUserInfo(req, res, next) {
    try {
      const userEmail = res.locals.user.email;
      const user = await userService.deleteUserInfo(userEmail);
      res.json(utils.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
