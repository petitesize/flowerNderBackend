const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const checkProductIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];
  // id 필수
  if (id === undefined) {
    next(
      new AppError(
        commonErrors.requestValidationError,
        `${from}: id는 필수값입니다.`,
        400
      )
    );
    return;
  }
  next();
};

const checkProductCategoryFrom = (from) => (req, res, next) => {
   const { category } = req[from];
   // category 필수
   if (category === undefined) {
     next(
       new AppError(
         commonErrors.requestValidationError,
         `${from}: category는 필수값입니다.`,
         400
       )
     );
     return;
   }
   next();
 };

module.exports = {
  checkProductIdFrom,
  checkProductCategoryFrom,
};
