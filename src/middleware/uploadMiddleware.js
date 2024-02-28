const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
//파일 업로드를 위한 multer 인스턴스인 미들웨어
const multer = require('multer'); 
const storage = multer.memoryStorage(); 

const uploadMiddleware = multer({
   storage: storage,
   fileFilter: function (req, file, cb) {
      const allowedMimes = ['image/jpeg', 'image/png']; //gif필요시 추후 추가
      if (allowedMimes.includes(file.mimetype)) {
        // 업로드 진행하는 콜백함수 짜야하는데ㅣ........
        next();
      } else {
        next(
          new AppError(
            commonErrors.inputError,
            'jpg, png 형식의 파일만 업로드 가능합니다.',
            400
          )
        )
      }
    }
});

module.exports = {
  uploadMiddleware
};