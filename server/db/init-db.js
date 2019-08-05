const faker = require('faker');
const models = require('./models');

const {
  User, Auth, Product, syncDB,
} = models;

const users = [];
const products = [];


function generateMockData() {
  return new Promise((resolve) => {
    for (let i = 0; i < 20; i += 1) {
      users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        mobile: faker.phone.phoneNumber(),
        password: faker.internet.password(),
        address: faker.address.streetAddress(),
        credits: faker.random.number({ min: 1000, max: 5000 }),
        auth: {
          pin: i === 0 ? 1234 : faker.random.number({ min: 1000, max: 9999 }),
        },
      });
    }

    for (let i = 0; i < 20; i += 1) {
      products.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: Math.round(Math.random() * 100),
      });
    }

    resolve();
  });
}

generateMockData().then(async () => {
  await syncDB();

  console.info('Creating mock users...');
  users.forEach(async (user) => {
    await User.create(user, {
      include: [{
        model: Auth,
        as: 'auth',
      }],
    });
  });

  console.info('Creating mock products...');
  products.forEach(async (product) => {
    await Product.create(product);
  });
});
