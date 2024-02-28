const { productService } = require("../service");
const utils = require("../misc/utils");
const imageService = require('../service/imageService');

const productController = {
   // HTTP GET를 위한 controller(request handler)
   // 상품 하나
   async getProduct(req, res, next) {
      try {
         const { productId } = req.params;
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

   // HTTP PUT를 위한 controller(request handler)
   async putProduct(req, res, next) {
      try {
         const { id } = req.params;
         const { category, title, price, stock, description, size, origin, attribute, main_image, sub_image } = req.body;
         const product = await productService.updateProduct(id, {
            category, title, price, stock, description, size, origin, attribute, main_image, sub_image,
         });
         res.json(utils.buildResponse(product));
      } catch (error) {
         next(error);
      }
   },

   // HTTP DELETE를 위한 controller(request handler)
   async deleteProduct(req, res, next) {
      try {
         const { id } = req.params;
         const product = await productService.deleteProduct(id);
         res.json(utils.buildResponse(product));
      } catch (error) {
         next(error);
      }
   },

   // HTTP Post를 위한 controller(request handler)
   async postProduct(req, res, next) {
      try {
         const { category, title, price, stock, description, size, origin, attribute, main_image, sub_image } = req.body;
         const product = await productService.createProduct({ category, title, price, stock, description, size, origin, attribute, main_image, sub_image });
         res.status(201).json(utils.buildResponse(product));
      } catch (error) {
         next(error);
      }
   },

   // 이미지 업로드 -> postProduct 함수랑 묶어야할 필요성 보임
   async upload (req, res) {
      try {
        if (!req.file) {
          return res.status(400).json({ error: '이미지 파일이 없습니다.' });
        }
    
        const imageUrl = await imageService.uploadImageToS3(req.file);
    
        // 데이터베이스에 상품 정보와 imageUrl 저장하는 로직
        // ...
    
        res.status(201).json({ imageUrl });
      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        res.status(500).json({ error: '이미지 업로드에 실패했습니다.' });
      }
   },
};

module.exports = productController;
