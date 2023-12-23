const { faker } = require('@faker-js/faker');

// Function to generate a fake user
const generateFakeUser = () => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

// Generate 20 fake users
const fakeUsers = Array.from({ length: 20 }, generateFakeUser);

// Include one hardcoded user
const users = [
  {
    name: 'AJ Seadler',
    email: 'aj@example.com',
    password: 'securepass',
  },
  ...fakeUsers,
];

// Export the combined users array
module.exports = users;
