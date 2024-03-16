const productMiddleware = require("./productMiddleware");
const orderMiddleware = require("./orderMiddleware");
const adminMiddleware = require("./adminMiddleware");
const uploadMiddleware = require("./uploadMiddleware");
const verifyMiddleware = require("./verifyMiddleware")

module.exports = {
  productMiddleware,
  orderMiddleware,
  adminMiddleware,
  uploadMiddleware,
  verifyMiddleware,
};
