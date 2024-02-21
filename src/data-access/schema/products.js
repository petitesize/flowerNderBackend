const mongoose = require("mongoose");
const { Schema } = mongoose;

//제품 정보 스키마
const productsSchema = new Schema(
    {
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        soldout: {
          type: Boolean,
          required: true,
          default: false,
        },
        description: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true,
        },
        origin: {
            type: String,
            required: true,
        },
        attribute: {
            type: String,
            required: true,
            default: " ",
        },
        main_image: {
            type: ObjectId,
            required: true,
        },
      },
      {
        collection: "Product", // Product 컬랙션 생성
        versionKey: false,
        timestamps: true, // 게시글 정보가 새로 컬랙션에 추가될 때 createdAt과 updatedAt값을 추가, 이후 해당 document가 수정되면 updatedAt을 갱신해줌
      }
);

module.exports = productsSchema;