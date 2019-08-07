exports.USER_NOT_PRESENT = {
  code: 'OMS0001',
  message: 'User not present',
};

exports.PRODUCT_NOT_PRESENT = {
  code: 'OMS0001',
  message: 'Product not present',
};

exports.PRODUCT_OUT_OF_STOCK = {
  code: 'OMS0002',
  message: 'Product is out of stock',
};

exports.ORDER_CANCELLATION_FAILED = orderState => ({
  code: 'OMS0003',
  message: `Order cancellation failed as order is in ${orderState} state`,
});

exports.INSUFFICIENT_CREDITS = {
  code: 'OMS0004',
  message: 'User has insufficient credits',
};

exports.AUTHENTICATION_FAILED = {
  code: 'OMS0005',
  message: 'Authentication Failed',
};

exports.NOT_AUTHORIZED = {
  code: 'OMS0005',
  message: 'Not Authorized to perform this operation',
};

exports.ORDER_UPDATE_INTERVAL_IN_MS = 60 * 5 * 1000;
