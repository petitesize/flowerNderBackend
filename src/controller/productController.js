const { productService } = require("../service");
const utils = require("../misc/utils");
const imageService = require("../service/imageService");

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
      const {
        category,
        title,
        price,
        stock,
        description,
        size,
        origin,
        attribute,
        main_image,
        sub_image,
      } = req.body;
      const product = await productService.updateProduct(id, {
        category,
        title,
        price,
        stock,
        description,
        size,
        origin,
        attribute,
        main_image,
        sub_image,
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
      // 메인 이미지 업로드 처리
      const main_img_file = req.files['main_image'] ? req.files['main_image'][0] : null;
      let main_img_url = "";
      if (main_img_file) {
        main_img_url = await imageService.imageUpload(main_img_file);
      } else {
        return res.status(400).json({ error: "메인 이미지 파일이 없습니다." });
      }

      // 서브 이미지 업로드 처리
      const sub_img_files = req.files['sub_image'] || [];
      const sub_img_urls = await Promise.all(
        sub_img_files.map(file => imageService.imageUpload(file))
      );

      // 상품 정보 처리
      const {
        category,
        title,
        price,
        stock,
        description,
        size,
        origin,
        attribute,
      } = req.body;
      // 이미지 URL을 상품 정보에 추가
      const product = await productService.createProduct({
        category,
        title,
        price,
        stock,
        description,
        size,
        origin,
        attribute,
        main_image: main_img_url, // S3에서 반환된 메인 이미지 URL
        sub_image: sub_img_urls, // 서브 이미지 URL 배열(최대 5개)
      });

      res.status(201).json(utils.buildResponse(product));
    } catch (error) {
      console.error("상품 등록 실패:", error);
      next(error); // 에러 핸들링을 위해 next()에 에러를 넘깁니다
    }
  },
  // async postProduct(req, res, next) {
  //    try {
  //       const { category, title, price, stock, description, size, origin, attribute, main_image, sub_image } = req.body;
  //       const product = await productService.createProduct({ category, title, price, stock, description, size, origin, attribute, main_image, sub_image });
  //       res.status(201).json(utils.buildResponse(product));
  //    } catch (error) {
  //       next(error);
  //    }
  // },
};

module.exports = productController;
