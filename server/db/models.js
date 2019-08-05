const Sequelize = require('sequelize');

const db = new Sequelize('', '', '', {
  dialect: 'sqlite',
  storage: 'db/order-management-db.sqlite',
  logging: false
})

const User = db.define('user', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING,
  mobile: Sequelize.STRING,
  password: Sequelize.STRING,
  address: Sequelize.STRING,
  status: { type: Sequelize.STRING, defaultValue: 'ACTIVE' },
  credits: { type: Sequelize.INTEGER, defaultValue: 30 },
});

const Auth = db.define('auth', {
  pin: Sequelize.INTEGER,
});

User.belongsTo(Auth, { as: 'auth' });

const Product = db.define('product', {
  name: Sequelize.STRING,
  price: Sequelize.INTEGER,
  description: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  quantity: Sequelize.INTEGER,
});

const Order = db.define('order', {
  totalAmount: Sequelize.FLOAT,
  status: Sequelize.STRING,
});


const Payment = db.define('payment', {
  status: Sequelize.STRING,
  totalAmount: Sequelize.FLOAT,
});

Payment.belongsTo(Order);
Payment.belongsTo(User);

Order.belongsTo(User);
Order.belongsTo(Product);

function syncDB() {
  return db.sync({
    force: false,
  });
}


module.exports = {
  User,
  Auth,
  Product,
  Order,
  Payment,
  syncDB,
};
