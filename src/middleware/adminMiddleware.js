const jwt = require("jsonwebtoken");
const config = require("../config");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

// 토큰 검증
const checkAuthentication = (req, res, next) => {
  if (req.headers["authorization"] === undefined) {
    next(
      new AppError(
        commonErrors.authenticationError,
        "권한이 없거나 인증되지 않은 유저입니다. 본인의 권한을 체크하거나 로그인 해주세요",
        401
      )
    );
    return;
  }

  // Authrization: Bearer <token>

  try {
    const token = req.headers["authorization"].slice(7);
    const userInfo = jwt.verify(token, config.jwtSecret);
    res.locals.user = userInfo;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(
        new AppError(
          commonErrors.authenticationError,
          "토큰이 만료되었습니다. 다시 로그인 해주세요",
          401
        )
      );
      return;
    } else if (error.name === "JsonWebTokenError") {
      next(
        new AppError(
          commonErrors.authenticationError,
          "토큰이 유효하지 않습니다. 다시 로그인 해주세요",
          401
        )
      );
      return;
    }
    next(error);
  }
};

// 접근 권한 체크
const checkAdminPermission = (req, res, next) => {
  if (!res.locals.user.isAdmin) {
    next(
      new AppError(
        commonErrors.authorizationError,
        "접근 권한이 없습니다.",
        403
      )
    );
    return;
  }
  next();
};

module.exports = {
  checkAuthentication,
  checkAdminPermission,
};
