const { userService } = require("../service");
const utils = require("../misc/utils");

const userController = {
   // 회원주문조회
   async getUserOrder(req, res, next) {
      try {
         const email = res.locals.user.email;
         const { id } = req.query;
         const product = await productService.getProduct(productId);
         res.json(utils.buildResponse(product));
      } catch (error) {
         next(error);
      }
   },

   // 회원정보조회
   async getUserInfo(req, res, next) {
      try {
         const email = res.locals.user.email;
         const userInfo = await userService.getUserInfo({ email });
         res.json(utils.buildResponse(userInfo));
      } catch (error) {
         next(error);
      }
   },

   // 회원정보수정
   async putUserInfo(req, res, next) {
      try {
         const { productId } = req.params;
         const { category, title, price, stock, description, size, origin, attribute, main_image, sub_image } = req.body;
         const product = await productService.updateProduct(productId, {
            category, title, price, stock, description, size, origin, attribute, main_image, sub_image,
         });
         res.json(utils.buildResponse(product));
      } catch (error) {
         next(error);
      }
   }
};

module.exports = userController;
