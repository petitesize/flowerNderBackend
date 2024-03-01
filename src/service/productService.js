const { productDAO } = require("../data-access");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

class ProductService {
  // 상품 추가 메소드
  async createProduct({
    category,
    title,
    price,
    stock,
    description,
    size,
    origin,
    attribute,
    main_image,
    sub_images,
  }) {
    //title로 기존 상품 중복 체크 먼저
    const existingTitle = await productDAO.findProduct(title);
    if (existingTitle !== null) {
      throw new AppError(commonErrors.inputError, "리소스 중복 에러", 400);
    }

    const newProduct = await productDAO.create({
      category,
      title,
      price,
      stock,
      description,
      size,
      origin,
      attribute,
      main_image,
      sub_images,
    });
    return { message: "상품이 성공적으로 추가되었습니다.", newProduct };
  }

  // 특정 id를 갖는 하나의 상품을 가져오는 메소드
  async getProduct(id) {
    const product = await productDAO.findById(id);
    if (product === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "해당 상품이 존재하지 않습니다",
        404,
      );
    }
    return product;
  }

  // 특정 조건(category)에 맞는 여러 개의 게시글을 가져오는 메소드
  async getProducts({ category }) {
    const products = await productDAO.findMany({ category });
    if (products.length === 0) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "해당 카테고리가 존재하지 않습니다",
        404,
      );
    }
    return products;
  }

  // 특정 id를 갖는 하나의 상품을 업데이트하는 메소드
  async updateProduct(
    id,
    {
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
    },
  ) {
    const updatedProduct = await productDAO.updateOne(id, {
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
    if (updatedProduct === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "해당 상품이 존재하지 않습니다",
        404,
      );
    }
    return { message: "상품정보가 성공적으로 수정되었습니다.", updatedProduct };
  }

  // 특정 id를 갖는 하나의 상품을 삭제하는 메소드
  async deleteProduct(id) {
    const deletedProduct = await productDAO.deleteOne(id);
    if (deletedProduct === null) {
      throw new AppError(
        commonErrors.resourceNotFoundError,
        "해당 상품이 존재하지 않습니다",
        404,
      );
    }
    return { message: "상품이 성공적으로 삭제되었습니다.", deletedProduct };
  }
}

module.exports = new ProductService();
