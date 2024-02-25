const jwt = require("jsonwebtoken");
const config = require("../config");

// 토큰 검증
const checkAuthorization = (req, res, next) => {
   if (req.headers["authorization"] === undefined) {
      res.status(401).json({
        error:
          "권한이 없거나 인증되지 않은 유저입니다. 본인의 권한을 체크하거나 로그인 해주세요",
        data: null,
      });
   } else {
      const token = req.headers["authorization"];
      const userInfo = jwt.verify(token, config.jwtSecret);
      res.locals.user = userInfo;
      next();
   }
};

module.exports = {
   checkAuthorization,
};
