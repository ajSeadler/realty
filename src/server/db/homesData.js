const { faker } = require('@faker-js/faker');

// Function to generate a fake home
const generateFakeHome = () => ({
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state({ abbreviated: true }),
  bedrooms: faker.number.int({ min: 2, max: 5 }),
  bathrooms: [1, 1.5, 2, 2.5, 3, 3.5, 4][faker.number.int({ min: 0, max: 6 })], // Choose from predefined options
  square_feet: faker.number.int({ min: 1500, max: 3500 }),
  price: faker.number.int({ min: 250000, max: 600000 }),
  year_built: faker.number.int({ min: 1980, max: 2022 }),
  image_url: `https://picsum.photos/800/600?random=${faker.number.int(1000)}&category=architecture`,
  zillow_link: faker.internet.url(),
  agent_id: faker.number.int({ min: 1, max: 10 }), // Random agent ID between 1 and 2
  bio: faker.lorem.paragraph(),
});

// Generate 20 fake homes
const homes = Array.from({ length: 60 }, generateFakeHome);

module.exports = homes;
