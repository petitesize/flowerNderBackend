const commentMiddleware = require("./commentMiddleware");
const postMiddleware = require("./postMiddleware");
const productMiddleware = require("./productMiddleware");
const orderMiddleware = require("./orderMiddleware");
const adminMiddleware = require("./adminMiddleware");
const uploadMiddleware = require("./uploadMiddleware");
const verifyMiddleware = require("./verifyMiddleware")

module.exports = {
  commentMiddleware,
  postMiddleware,
  productMiddleware,
  orderMiddleware,
  adminMiddleware,
  uploadMiddleware,
  verifyMiddleware,
};
