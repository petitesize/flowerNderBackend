const mongoose = require("mongoose");
const imageSchema = require('./image.js');

// 주문 아이템 스키마
const orderItemSchema = new mongoose.Schema(
  {
    //주문한 상품에 맞는 main_image와 title 불러와야함
    product_id: {
      type: mongoose.Types.ObjectId,
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
      type: Date,
      default: new Date(),
    },
    cancel_req: {
      type: Boolean,
      required: true,
      default: false,
    },
    //일단 무통장입금으로 통일이지만 Order document에는 정보 저장 필요해보여서 추가
    pay_method: {
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