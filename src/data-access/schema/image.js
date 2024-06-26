const mongoose = require("mongoose");

// 상품 이미지 스키마
const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    default: null,
    match: [/^https?:\/\/\S+$/, "올바른 URL 형식이어야 합니다."],
  },
  alt: {
    type: String,
  }, // 이미지 대체 텍스트
});

module.exports = imageSchema;
