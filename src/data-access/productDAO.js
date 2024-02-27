const { Product } = require("./model");
const utils = require("../misc/utils");

class ProductDAO {
   // 새로운 상품 document 객체를 생성하여 mongoDB에 저장하는 메소드
   async create({ category, title, price, stock, description, size, origin, attribute, main_image, sub_image }) {
      const product = new Product({ category, title, price, stock, description, size, origin, attribute, main_image, sub_image });
      await product.save();
      return product.toObject();
   }

   // 특정 id를 _id로 갖는 상품 document 객체를 찾아오는 메소드
   async findById(id) {
      const plainproduct = await Product.findById(id).lean();
      return plainproduct;
   }
  
   // 특정 조건({ category })에 맞는 복수의 상품 document 객체를 찾아오는 메소드.
   async findMany({ category }) {
      const sanitizedFilter = utils.sanitizeObject({
         category,
      });
      const plainProducts = await Product.find(sanitizedFilter).lean();
      return plainProducts;
   }

   // 특정 id를 _id로 갖고 있는 상품 document를 toUpdate 객체의 내용으로 덮어 씌우는 메소드.
   async updateOne(id, { category, title, price, stock, description, size, origin, attribute, main_image, sub_image }) {
      const sanitizedToUpdate = utils.sanitizeObject({
         category, title, price, stock, description, size, origin, attribute, main_image, sub_image,
      });
      // 해당 id를 갖는 상품 document를 먼저 찾고 있으면 업데이트하는 메소드
      const plainUpdatedProduct = await Product.findByIdAndUpdate(
         id, 
         sanitizedToUpdate, 
         {
         runValidators: true, 
         new: true, 
         }
      ).lean(); 
      return plainUpdatedProduct;
   }

   // 특정 id를 _id로 갖고 있는 상품 document를 삭제한다(hard delete).
   async deleteOne(id) {
      const plainDeletedProduct = await Product.findByIdAndDelete(id).lean(); 
      return plainDeletedProduct;
   }
}

module.exports = new ProductDAO();
