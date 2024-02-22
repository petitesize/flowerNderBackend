const mongoose = require("mongoose");
const imageSchema = require('./image.js');

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
    sub_image: [imageSchema],
  },
  {
    collection: "Product", // Product 컬랙션 생성
    versionKey: false,
    timestamps: true, 
  }
);

module.exports = productSchema;