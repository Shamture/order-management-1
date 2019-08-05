const cote = require('cote');
const models = require('../db/models');
const constants = require('../utils/constants');

const {
  Payment, Order, Product, User,
} = models;
const { INSUFFICIENT_CREDITS, AUTHENTICATION_FAILED } = constants;

const paymentsResponder = new cote.Responder({
  name: 'Payments Responder',
  namespace: 'payment',
  respondsTo: ['process_payment'],
});

/**
 * This event handler is responsible for executing business logic and process payment of orders
 */
paymentsResponder.on('process_payment', (req, cb) => {
  const {
    user, order, product, authPin,
  } = req;

  const payment = {
    status: 'CONFIRMED',
    totalAmount: order.totalAmount,
    userId: user.id,
    orderId: order.id,
  };

  if (user.auth && user.auth.pin !== authPin) {
    payment.status = 'DECLINED';
    Payment.create(payment).then(() => {
      const update = {
        status: 'CANCELLED',
      };

      Order.update(update, { where: { id: order.id } }).then(() => cb(AUTHENTICATION_FAILED, null));
    });

    return;
  }

  if (user.credits < order.totalAmount) {
    payment.status = 'DECLINED';

    Payment.create(payment).then(() => {
      order.status = 'CANCELLED';

      Order.update(order, { where: { id: order.id } }).then(() => cb(INSUFFICIENT_CREDITS, null));
    });
  } else {
    Payment.create(payment).then(() => {
      user.credits -= payment.totalAmount;

      User.update(user, { where: { id: user.id } }).then(() => {
        product.quantity -= 1;

        Product.update(product, { where: { id: product.id } }).then(() => {
          order.status = 'CONFIRMED';

          Order.update(order, { where: { id: order.id } }).then(() => cb(null, true));
        });
      });
    });
  }
});
