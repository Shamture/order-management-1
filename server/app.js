const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
// const io = require('socket.io')(server);
const cote = require('cote');
const models = require('./db/models');

const { Product, Order, Payment } = models;

const orderRequester = new cote.Requester({
  name: 'Order Requester',
  namespace: 'order',
});

app.use(bodyParser.json());

app.post('/api/order/create', (req, res, next) => {
  orderRequester.send({
    type: 'create_order',
    userId: req.body.userId,
    productId: req.body.productId,
    authPin: req.body.authPin,
  }, (err, result) => {
    if (err) {
      res.status(400).send({
        error: err,
      });
    } else {
      res.status(200).send({
        status: 'Order placed successful',
        orderId: result.orderId,
      });
    }

    next();
  });
});

app.get('/api/order/cancel/:id', (req, res, next) => {
  orderRequester.send({
    type: 'cancel_order',
    orderId: req.params.id,
  }, (err) => {
    if (err) {
      res.status(400).send({
        error: err,
      });
    } else {
      res.status(200).send({
        status: 'Order cancellation success.',
      });
    }
  });
});

app.get('/api/order/status/:id', (req, res, next) => {
  orderRequester.send({
    type: 'check_order_status',
    orderId: req.params.id,
  }, (err, result) => {
    if (err) {
      res.status(400).send({
        error: err,
      });
    } else {
      res.status(200).send(result);
    }
  });
});

app.get('/api/products', (req, res, next) => {
  Product.findAll().then(products => res.status(200).send(products));
});

app.get('/api/products/:id', (req, res, next) => {
  Product.findByPk(req.params.id).then(product => res.status(200).send(product));
});

app.get('/api/orders/:userId', (req, res, next) => {
  Order.findAll({
    where: {
      userId: parseInt(req.params.userId, 10),
    },
  }).then(orders => res.status(200).send(orders));
});

app.get('/api/payments/:userId', (req, res, next) => {
  Payment.findAll({
    where: {
      userId: parseInt(req.params.userId, 10),
    },
  }).then(payments => res.status(200).send(payments));
});

server.listen(3000);

module.exports = server;
