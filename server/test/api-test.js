// Import dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');

const { assert } = chai;
const { describe, it } = require('mocha');
const app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

let orderId = 0; currentUser = {};

describe('Order API', () => {
  before((done) => {
    chai.request(app)
      .post('/api/user/authenticate')
      .send({
        email: 'rahulraja.ngp@gmail.com',
        password: 'Tech8092',
      }).end((err, res) => {
        currentUser = res.body;

        done();
      });
  });

  it('should create new order with /order/create API', (done) => {
    chai.request(app)
      .post('/api/order/create')
      .set('Authorization', `Bearer ${currentUser.token}`)
      .send({
        userId: currentUser.id,
        productId: 1,
        authPin: 1234,
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        orderId = res.body.orderId;

        done();
      });
  });

  it('should able to get status of existing order with /order/status API', (done) => {
    chai.request(app)
      .get(`/api/order/status/${orderId}`)
      .set('Authorization', `Bearer ${currentUser.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        assert.isNotNull(res.body.status);

        done();
      });
  });

  it('should able to cancel existing order with /order/cancel API', (done) => {
    chai.request(app)
      .get(`/api/order/cancel/${orderId}`)
      .set('Authorization', `Bearer ${currentUser.token}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        assert.isNotNull(res.body.status);

        // Check if order is successfully canceled or not
        chai.request(app)
          .get(`/api/order/status/${orderId}`)
          .set('Authorization', `Bearer ${currentUser.token}`)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            assert.isNotNull(response.body.status);
            assert.strictEqual(response.body.status, 'CANCELLED');

            done();
          });
      });
  });
});
