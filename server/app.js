const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
// const io = require('socket.io')(server);
const cote = require('cote');
const models = require('./db/models');
const constants = require('./utils/constants');

const { AUTHENTICATION_FAILED, NOT_AUTHORIZED } = constants;

const excludeUrls = ['/api/user/authenticate', '/api/health'];

const {
  Product, Order, Payment, User,
} = models;

const orderRequester = new cote.Requester({
  name: 'Order Requester',
  namespace: 'order',
});


app.use(bodyParser.json());

app.use((req, res, next) => {
  if (!req.headers.authorization && excludeUrls.indexOf(req.url) === -1) {
    return res.status(403).send(NOT_AUTHORIZED);
  }
  next();
});

app.get('/api/health', (req, res, next) => res.status(200).send({
  uptime: Math.round(process.uptime()),
}));


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
    include: { model: Product, as: 'product' },
    order: [
      ['updatedAt', 'DESC'],
    ]
  }).then(orders => res.status(200).send(orders));
});

app.get('/api/payments/:userId', (req, res, next) => {
  Payment.findAll({
    where: {
      userId: parseInt(req.params.userId, 10),
    },
  }).then(payments => res.status(200).send(payments));
});

app.get('/api/order/:id', (req, res, next) => {
  Order.findByPk(req.params.id, { include: [{ model: Product, as: 'product' }] })
    .then(order => res.status(200).send(order));
});

app.post('/api/user/authenticate', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  }).then((user) => {
    if (user) {
      res.status(200).send({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: 'fake-jwt-token',
      });
    } else {
      return res.status(400).send(AUTHENTICATION_FAILED);
    }
  });
});

server.listen(3000);

module.exports = server;
