const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const { userDAO } = require("../data-access");

class authService {
  //회원가입 서비스
  async signUp({ email, plainPassword, user_name, phone_number, address, address_detail, isAdmin }) {
    //이메일로 기존 유저 여부 
    const existingUser = await userDAO.findByEmail(email);
    if(existingUser !== null) {
      throw new AppError(
        commonErrors.inputError,
        "Already being used email",
        400
      )
    }
    //회원가입 시작
    const hashedPassword = await bcrypt.hash(plainPassword, 15);
    const newUser = await userDAO.create({
      email,
      password: hashedPassword,
      user_name, phone_number, address, address_detail,
      isAdmin,
    });

    return {
      id: newUser._id,
      email: newUser.email,
      user_name: newUser.user_name,
      phone_number: newUser.phone_number,
      address: newUser.address,
      address_detail: newUser.address_detail,
      isAdmin: newUser.isAdmin,
    };
  }

  //로그인 서비스
  async signIn({ email, plainPassword }) {

    const user = await userDAO.findByEmail(email);
    if(user === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "Please doublecheck your email or password", //유저가 없는 경우더라도 보안을 위해 이메일과 비밀번호 체크해달라는 에러 던지기
        400
      )
    }

    const isPasswordValid = await bcrypt.compare(plainPassword, user.password)
    if(!isPasswordValid) {
      throw new AppError(
        commonErrors.inputError,
        "Please doublecheck your email or password",
        400
      )
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
          if(error) {
            reject(error);
            return;
          }
          resolve(encoded);
        }
      );
    })
    return encodedToken;
  }

}

module.exports = new authService();
