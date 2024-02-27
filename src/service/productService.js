const { productDAO } = require("../data-access");
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

class ProductService {
   // 상품 추가 메소드
   async createProduct({ category, title, price, stock, description, size, origin, attribute, main_image, sub_image }) {
      const newProduct = await productDAO.create({
         category, title, price, stock, description, size, origin, attribute, main_image, sub_image
      });
      return newProduct;
   }

   // 특정 id를 갖는 하나의 상품을 가져오는 메소드
   async getProduct(id) { 
      const product = await productDAO.findById(id);
      return product;
   }

   // 특정 조건(category)에 맞는 여러 개의 게시글을 가져오는 메소드
   async getProducts({ category }) {
      const products = await productDAO.findMany({ category });
      return products;
   }

   // 특정 id를 갖는 하나의 상품을 업데이트하는 메소드
   async updateProduct(id, { category, title, price, stock, description, size, origin, attribute, main_image, sub_image }) {
      const updatedProduct = await productDAO.updateOne(id, { category, title, price, stock, description, size, origin, attribute, main_image, sub_image });
      if (updatedProduct === null) {
         throw new AppError(
         commonErrors.resourceNotFoundError,
         "해당 상품이 존재하지 않습니다",
         404
         );
      }
      return updatedProduct;
   }

   // 특정 id를 갖는 하나의 상품을 삭제하는 메소드
   async deleteProduct(id) {
      const deletedProduct = await productDAO.deleteOne(id);
      if (deletedProduct === null) {
         throw new AppError(
         commonErrors.resourceNotFoundError,
         "해당 상품이 존재하지 않습니다",
         404
         );
      }
      return { message: "상품이 성공적으로 삭제되었습니다.", deletedProduct };
   }
}

module.exports = new ProductService();
