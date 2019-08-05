const app = require('express')();
const bodyParser = require('body-parser');
const server = require('http').Server(app);
// const io = require('socket.io')(server);
const cote = require('cote');

const orderRequester = new cote.Requester({
  name: 'Order Requester',
  namespace: 'order',
});

app.use(bodyParser.json());

// app.all('*', (req, res, next) => {
//     console.log(req.method, req.url)
//     next();
// })

app.post('/order/create', (req, res, next) => {
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
        status: 'Order placed successfull',
        orderId: result.orderId,
      });
    }

    next();
  });
});

app.get('/order/cancel/:id', (req, res, next) => {
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

app.get('/order/status/:id', (req, res, next) => {
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

server.listen(3000);

module.exports = server;
