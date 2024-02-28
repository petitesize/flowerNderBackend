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
        400,
      ),
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
        400,
      ),
    );
    return;
  }
  next();
};

const checkCompleteProductFrom = (from) => (req, res, next) => {
  const {
    category,
    title,
    price,
    stock,
    description,
    size,
    origin,
    attribute,
    main_image,
    sub_image,
  } = req[from];

  // category 필수
  if (category === undefined || category === "") {
    next(
      new AppError(
        commonErrors.requestValidationError,
        `${from}: category는 필수값입니다.`,
        400,
      ),
    );
    return;
  }

  // title 필수
  if (title === undefined || title === "") {
    next(
      new AppError(
        commonErrors.requestValidationError,
        `${from}: title은 필수값입니다.`,
        400,
      ),
    );
    return;
  }

  // price 필수
  if (price === undefined || price === "") {
    next(
      new AppError(
        commonErrors.requestValidationError,
        `${from}: price는 필수값입니다.`,
        400,
      ),
    );
    return;
  }

  // stock 필수
  if (stock === undefined || stock === "") {
    next(
      new AppError(
        commonErrors.requestValidationError,
        `${from}: stock은 필수값입니다.`,
        400,
      ),
    );
    return;
  }

  // description 필수
  if (description === undefined || description === "") {
    next(
      new AppError(
        commonErrors.requestValidationError,
        `${from}: description은 필수값입니다.`,
        400,
      ),
    );
    return;
  }

  // size 필수
  if (size === undefined || size === "") {
    next(
      new AppError(
        commonErrors.requestValidationError,
        `${from}: size는 필수값입니다.`,
        400,
      ),
    );
    return;
  }

  // origin 필수
  if (origin === undefined || origin === "") {
    next(
      new AppError(
        commonErrors.requestValidationError,
        `${from}: origin은 필수값입니다.`,
        400,
      ),
    );
    return;
  }

  // attribute 필수
  if (attribute === undefined || attribute === "") {
    next(
      new AppError(
        commonErrors.requestValidationError,
        `${from}: attribute는 필수값입니다.`,
        400,
      ),
    );
    return;
  }

  // main_image 필수
  if (main_image.url === undefined || main_image.url === "") {
    next(
      new AppError(
        commonErrors.requestValidationError,
        `${from}: main_image는 필수값입니다.`,
        400,
      ),
    );
    return;
  }

  // sub_image 필수
  if (sub_image === undefined || sub_image.length === 0) {
    next(
      new AppError(
        commonErrors.requestValidationError,
        `${from}: sub_image는 필수값입니다.`,
        400,
      ),
    );
    return;
  }

  next();
};

module.exports = {
  checkProductIdFrom,
  checkProductCategoryFrom,
  checkCompleteProductFrom,
};
