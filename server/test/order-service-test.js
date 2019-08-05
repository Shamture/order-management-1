const cote = require('cote');
const { assert } = require('chai');
const faker = require('faker');
// const { describe, it } = require('mocha');
const constants = require('../utils/constants');

const {
  USER_NOT_PRESENT, PRODUCT_NOT_PRESENT, AUTHENTICATION_FAILED,
} = constants;

const orderRequester = new cote.Requester({
  name: 'Order Requester',
  namespace: 'order',
});

describe('Order Service', () => {
  describe('Create new order in db', () => {
    it('should successfully create new order in db', (done) => {
      orderRequester.send({
        type: 'create_order',
        userId: 1,
        productId: 1,
        authPin: 1234,
      }, (err, result) => {
        assert.isNull(err);
        assert.isNotNull(result);

        done();
      });
    });

    it('should failed create new order in db, when random userId is passed', (done) => {
      orderRequester.send({
        type: 'create_order',
        userId: faker.random.number(100000),
        productId: 1,
        authPin: 1234,
      }, (err) => {
        assert.isNotNull(err);
        assert.isObject(err);
        assert.isString(err.code);
        assert.equal(err.code, USER_NOT_PRESENT.code);
        assert.isString(err.message);
        assert.equal(err.message, USER_NOT_PRESENT.message);

        done();
      });
    });

    it('should failed to create new order in db, when random productId is passed', (done) => {
      orderRequester.send({
        type: 'create_order',
        userId: 1,
        productId: faker.random.number(100000),
        authPin: 1234,
      }, (err) => {
        assert.isNotNull(err);
        assert.isObject(err);
        assert.isString(err.code);
        assert.equal(err.code, PRODUCT_NOT_PRESENT.code);
        assert.isString(err.message);
        assert.equal(err.message, PRODUCT_NOT_PRESENT.message);

        done();
      });
    });

    it('should failed to create new order in db, when random authentication pin is passed', (done) => {
      orderRequester.send({
        type: 'create_order',
        userId: 1,
        productId: 1,
        authPin: faker.random.number(1000, 9999),
      }, (err) => {
        assert.isNotNull(err);
        assert.isObject(err);
        assert.isString(err.code);
        assert.equal(err.code, AUTHENTICATION_FAILED.code);
        assert.isString(err.message);
        assert.equal(err.message, AUTHENTICATION_FAILED.message);

        done();
      });
    });
  });
});
