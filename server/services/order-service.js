/* eslint-disable consistent-return */
const cote = require('cote');
const models = require('../db/models');
const constants = require('../utils/constants');

const {
  Order, Product, User, Auth,
} = models;
const {
  USER_NOT_PRESENT, PRODUCT_OUT_OF_STOCK, ORDER_CANCELLATION_FAILED,
} = constants;

const { ORDER_UPDATE_INTERVAL_IN_MS, PRODUCT_NOT_PRESENT } = constants;
const ordersResponder = new cote.Responder({
  name: 'Order Responder',
  namespace: 'order',
});

const paymentsRequester = new cote.Requester({
  name: 'Payment Request',
  namespace: 'payment',
});

const orderRequester = new cote.Requester({
  name: 'Order Requester',
  namespace: 'order',
});

/**
 * This event handler is reponsible for handling business logic and create order
 */
ordersResponder.on('create_order', (req, cb) => {
  const { userId, productId, authPin } = req;

  // Checking if user is present in database.
  User.findByPk(userId, { include: [{ model: Auth, as: 'auth' }] }).then((user) => {
    if (!user) {
      return cb(USER_NOT_PRESENT, null);
    }

    // Checking if product is present in database
    Product.findByPk(productId).then((product) => {
      if (!product) {
        return cb(PRODUCT_NOT_PRESENT, null);
      }

      // Checking if product is in stock
      if (product.quantity === 0) {
        return cb(PRODUCT_OUT_OF_STOCK, null);
      }

      const orderObject = {
        totalAmount: product.price,
        userId: user.id,
        productId: product.id,
        status: 'CREATED',
      };

      // Creating new order in database
      Order.create(orderObject).then((order) => {
        paymentsRequester.send({
          type: 'process_payment',
          user,
          order,
          product,
          authPin,
        }, (err) => {
          setTimeout(() => {
            orderRequester.send({
              type: 'check_and_update_order_status',
              orderId: order.id,
            });
          }, ORDER_UPDATE_INTERVAL_IN_MS, order);

          return cb(err, {
            orderId: order.id,
          });
        });
      });
    });
  });
});

/**
 * This event handler will check order's current status and will change its status to delivered
 */
ordersResponder.on('check_and_update_order_status', (req) => {
  const { orderId } = req;

  Order.findByPk(orderId).then((order) => {
    if (order.status === 'CONFIRMED') {
      const update = {
        status: 'DELIVERED',
      };

      Order.update(update, { where: { id: order.id } });
    } else {
      console.info('Cannot update order as order is in ', order.status, ' status');
    }
  });
});

/**
 * This event handler will cancel order
 */
ordersResponder.on('cancel_order', (req, cb) => {
  const { orderId } = req;

  Order.findByPk(orderId).then((order) => {
    if (order.status === 'CONFIRMED' || order.status === 'CREATED') {
      const update = {
        status: 'CANCELLED',
      };

      Order.update(update, { where: { id: order.id } }).then(() => cb(null, true));
    } else {
      return cb(ORDER_CANCELLATION_FAILED(order.status), null);
    }
  });
});

/**
 * This event handler will check order status
 */
ordersResponder.on('check_order_status', (req, cb) => {
  const { orderId } = req;

  Order.findByPk(orderId).then(order => cb(null, {
    status: order.status,
  }));
});
