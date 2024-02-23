const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const checkCompleteOrderForm = (from) => (req, res, next) => {
  const { order_amount, customer_info, shipping_info } = req[from];

  // 주문수량 0 안됨
  if (order_amount === undefined || order_amount <= 0) {
    next(new AppError(commonErrors.requestValidationError, `주문 금액은 0보다 커야 합니다.`, 400));
    return;
  }

  // 주문자 정보는 다 기입해야 함
  const customerRequiredFields = ['name', 'email', 'phone_number'];
  for (const field of customerRequiredFields) {
    if (!customer_info || !customer_info[field]) {
      next(new AppError(commonErrors.requestValidationError, `고객 정보의 ${field}는 필수입니다.`, 400));
      return;
    }
  }

  // 배송지 정보는 다 기입해야 함
  const shippingRequiredFields = ['recipient', 'phone_number', 'postal_code', 'address', 'address_detail'];
  for (const field of shippingRequiredFields) {
    if (!shipping_info || !shipping_info[field]) {
      next(new AppError(commonErrors.requestValidationError, `배송 정보의 ${field}는 필수입니다.`, 400));
      return;
    }
  }
  next();
};

module.exports = { checkCompleteOrderForm };
