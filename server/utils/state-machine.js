const StateMachine = require('javascript-state-machine');
const models = require('../../db/models');

const { Order } = models;

const OrderStates = StateMachine.factory({
  init: 'CREATED',
  transitions: [
    { name: 'confirmed', from: 'CREATED', to: 'CONFIRMED' },
    { name: 'delivered', from: 'CONFIRMED', to: 'DELIVERED' },
    { name: 'cancelled', from: ['CREATED', 'CONFIRMED'], to: 'CANCELLED' },
  ],
  data(order) { //  <-- use a method that can be called for each instance
    return {
      order,
    };
  },
  methods: {
    confirmed() {
      this.order.status = 'CONFIRMED';

      Order.update(this.order, { where: { id: this.order.id } }).then(() => {
        console.info('Order status = confirmed in database');
      });
    },
    delivered() {
      this.order.status = 'DELIVERED';

      Order.update(this.order, { where: { id: this.order.id } }).then(() => {
        console.info('Order status = delivered in database');
      });
    },
    cancelled() {
      this.order.status = 'CANCELLED';

      Order.update(this.order, { where: { id: this.order.id } }).then(() => {
        console.info('Order status = cancelled in database');
      });
    },
  },
});

module.exports = {
  OrderStates,
};
