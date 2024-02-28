const multer = require('multer');
const storage = multer.memoryStorage(); // 메모리 스토리지 사용
const upload = multer({ storage: storage });

module.exports = upload;