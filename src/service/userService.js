const { userDAO } = require("../data-access");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const bcrypt = require("bcrypt");
const { orderDAO } = require("../data-access");

class UserService {
  // 회원정보수정
  async updateUserInfo(
    userEmail,
    { plainPassword, new_password, user_name, address, address_detail, postal_code },
  ) {
    // 기존 비밀번호 일치 확인
    const user = await userDAO.findByEmail(userEmail);
    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError(
        commonErrors.inputError,
        "비밀번호를 다시 확인해주세요",
        400,
      );
    }

    // 비밀번호 변경 여부 확인
    if (new_password !== null) {
      plainPassword = new_password;
    } 

    // 회원정보 수정
    const hashedPassword = await bcrypt.hash(plainPassword, 15);
    const updatedUserInfo = await userDAO.updateByEmail(userEmail, {
      password: hashedPassword,
      user_name,
      address,
      address_detail,
      postal_code,
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

  // 회원정보조회(password, isAdmin 없음)
  async getUserInfo(userEmail) {
    const userInfo = await userDAO.findByEmail(userEmail);
    const { password, isAdmin, ...userInfoWithoutSensitive } = userInfo;
    return userInfoWithoutSensitive;
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
