const { faker } = require('@faker-js/faker');

// Function to generate a fake home
const generateFakeHome = (agentId) => ({
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
  agent_id: agentId,
  bio: faker.lorem.paragraph(),
});

// Generate 20 fake homes for agent 1
const fakeHomesAgent1 = Array.from({ length: 20 }, () => generateFakeHome(1));

// Generate 20 fake homes for agent 2
const fakeHomesAgent2 = Array.from({ length: 20 }, () => generateFakeHome(2));

// Combine fake homes with the original homes
const homes = [...fakeHomesAgent1, ...fakeHomesAgent2];

module.exports = homes;