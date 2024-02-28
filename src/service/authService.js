const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { userDAO } = require("../data-access");

class authService {
  //회원가입 서비스
  async signUp({
    email,
    plainPassword,
    user_name,
    phone_number,
    address,
    address_detail,
    postal_code,
    isAdmin,
  }) {
    //이메일로 기존 유저 여부
    const existingUser = await userDAO.findByEmail(email);
    if (existingUser !== null) {
      throw new AppError(commonErrors.inputError, "리소스 중복 에러", 400);
    }
    //회원가입 시작
    const hashedPassword = await bcrypt.hash(plainPassword, 15);
    const newUser = await userDAO.create({
      email,
      password: hashedPassword,
      user_name,
      phone_number,
      address,
      address_detail,
      postal_code,
      isAdmin,
    });

    return { message: "회원가입이 성공적으로 완료되었습니다.", newUser };
  }

  //로그인 서비스
  async signIn({ email, plainPassword }) {
    const user = await userDAO.findByEmail(email);
    if (user === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "이메일 또는 비밀번호를 다시 확인해주세요", //유저가 없는 경우더라도 보안을 위해 이메일과 비밀번호 체크해달라는 에러 던지기
        400,
      );
    }

    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    if (!isPasswordValid) {
      throw new AppError(
        commonErrors.inputError,
        "이메일 또는 비밀번호를 다시 확인해주세요",
        400,
      );
    }

    const tokenPayload = {
      email,
      isAdmin: user.isAdmin,
    };

    const encodedToken = await new Promise((resolve, reject) => {
      jwt.sign(
        tokenPayload,
        config.jwtSecret,
        { expiresIn: "6h" },
        (error, encoded) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(encoded);
        },
      );
    });
    return encodedToken;
  }
}

module.exports = new authService();
