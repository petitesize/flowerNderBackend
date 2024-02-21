const mongoose = require("mongoose");
const imageSchema = require('./image.js');

// 주문 아이템 스키마
const orderItemSchema = new mongoose.Schema(
  {
    product_id: {
        type: Number,
        required: true,
    },
    main_image: imageSchema,
    title: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    total_amount: {
        type: Number,
        required: true,
    },
  }
)

// 주문 정보 스키마
const orderSchema = new mongoose.Schema(
  {
    order_amount: {
      type: Number,
      required: true,
    },
    order_status: {
      type: String,
      required: true,
    },
    order_date: {
      type: String,
      required: true,
    },
    order_items: [orderItemSchema],
    customer_info: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone_number: {
        type: String,
        required: true,
      },
    },
    shipping_info: {
      recipient: {
        type: String,
        required: true,
      },
      phone_number: {
        type: String,
        required: true,
      },
      postal_code: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      address_detail: {
        type: String,
        required: true,
      },
      delivery_memo: {
        type: String,
        required: true,
        default: " ", 
      },
    },
  },
  {
    collection: "Order", // Order 컬랙션 생성
    versionKey: false,
    timestamps: true, 
  }
);

module.exports = orderSchema;