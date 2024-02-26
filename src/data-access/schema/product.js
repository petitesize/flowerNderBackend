const mongoose = require("mongoose");
const imageSchema = require('./image.js');

const MAX_SUB_IMAGES = 5;

// 서브 이미지 개수 제한
const subImagesValidator = function(subImages) {
  return subImages.length <= MAX_SUB_IMAGES;
};

// 상품 정보 스키마
const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
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
    attribute: {
        type: String,
        required: true,
        default: " ",
    },
    main_image: imageSchema,
    sub_image: {
      type: [imageSchema],
      validate: [subImagesValidator, `sub_image는 ${MAX_SUB_IMAGES}개 이하여야 합니다.`]
    },
  },
  {
    collection: "Product", // Product 컬랙션 생성
    versionKey: false,
    timestamps: true, 
  }
);

module.exports = productSchema;