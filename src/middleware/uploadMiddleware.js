const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
//파일 업로드를 위한 multer 인스턴스인 미들웨어
const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    const allowedMimes = ["image/jpeg", "image/png"]; //gif필요시 추후 추가
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new AppError(
        commonErrors.inputError,
        "jpg, png 형식의 파일만 업로드 가능합니다.",
        400,
      ))
    }
  },
}).fields([
  { name: 'main_image', maxCount: 1 }, 
  { name: 'sub_image', maxCount: 5 },
]);

// 파일 검증 및 업로드가 성공적으로 완료되면 multer는 내부적으로 next()를 호출

module.exports = {
  upload,
};
