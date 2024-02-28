const { userDAO } = require("../data-access");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const bcrypt = require("bcrypt");
const { orderDAO } = require("../data-access");

class UserService {
  // 회원정보조회(password, isAdmin 없음)
  async getUserInfo(userEmail) {
    const userInfo = await userDAO.findByEmail(userEmail);
    const { password, isAdmin, ...userInfoWithoutSensitive } = userInfo;
    return userInfoWithoutSensitive;
  }

  // 회원정보수정
  async updateUserInfo(
    userEmail,
    { plainPassword, user_name, address, address_detail },
  ) {
    const hashedPassword = await bcrypt.hash(plainPassword, 15);
    const updatedUserInfo = await userDAO.updateByEmail(userEmail, {
      password: hashedPassword,
      user_name,
      address,
      address_detail,
    });
    if (updatedUserInfo === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "해당 회원이 존재하지 않습니다",
        404,
      );
    }
    return {
      message: "회원정보수정이 성공적으로 완료되었습니다.",
      updatedUserInfo,
    };
  }

  // 회원주문조회
  async getUserOrder(email) {
    const userOrder = await orderDAO.findByEmail(email);
    return userOrder;
  }

  // 회원정보삭제
  async deleteUserInfo(userEmail) {
    const deletedUser = await userDAO.deleteByEmail(userEmail);
    if (deletedUser === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "해당 회원이 존재하지 않습니다",
        404,
      );
    }
    return { message: "회원정보가 성공적으로 삭제되었습니다.", deletedUser };
  }
}

module.exports = new UserService();
