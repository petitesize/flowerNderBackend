const { productService } = require("../service");
const utils = require("../misc/utils");

const productController = {
   // HTTP GET를 위한 controller(request handler)
   // 상품 하나
   async getProduct(req, res, next) {
      try {
         const { productId } = req.query;
         const product = await productService.getProduct(productId);
         res.json(utils.buildResponse(product));
      } catch (error) {
         next(error);
      }
   },

   // HTTP GET를 위한 controller(request handler)
   // 상품 카테고리별
   async getProducts(req, res, next) {
      try {
         const { category } = req.query;
         const products = await productService.getProducts({ category });
         res.json(utils.buildResponse(products));
      } catch (error) {
         next(error);
      }
   },
};

module.exports = productController;
