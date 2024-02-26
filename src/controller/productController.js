const { productService } = require("../service");
const utils = require("../misc/utils");

const productController = {
  // HTTP Post를 위한 controller(request handler)
  async postProduct(req, res, next) {
    try {
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
      const product = await productService.createProduct({
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
      res.status(201).json(utils.buildResponse(product));
    } catch (error) {
      next(error);
    }
  },

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
      const { productId } = req.params;
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
      const product = await productService.updateProduct(productId, {
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
      const { productId } = req.params;
      const product = await productService.deleteProduct(productId);
      res.json(utils.buildResponse(product));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
