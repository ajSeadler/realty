const { faker } = require('@faker-js/faker');

// Function to generate a fake agent
const generateFakeAgent = () => {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    image_url: `https://picsum.photos/200/300?random=${faker.number.int(1000)}&category=people`,
  };
};

// Generate 5 fake agents
const fakeAgents = Array.from({ length: 10 }, generateFakeAgent);

// Export the combined array of original and fake agents
module.exports = fakeAgents;
