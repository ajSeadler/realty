const db = require("./client");
const { createUser } = require("./users");
const homes = require("./homesData");
const users = require("./usersData");
const agents = require("./agentsData");

// Only need one - this was just to test.
const favorites = [
  {
    user_id: 1,
    home_id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
];

const dropTables = async () => {
  try {
    // Drop tables in reverse order to handle dependencies
    await db.query(`
      DROP TABLE IF EXISTS user_favorites, homes, agents, users CASCADE;
    `);
    console.log("Tables dropped successfully.");
  } catch (err) {
    throw err;
  }
};

const createTables = async () => {
  try {
    await db.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) DEFAULT 'name',
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE agents(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone_number VARCHAR(255),
        image_url VARCHAR(255)
      );

      CREATE TABLE homes (
        id SERIAL PRIMARY KEY,
        address VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL, 
        state VARCHAR(2) NOT NULL, 
        bedrooms INT,
        bathrooms FLOAT,
        square_feet INT,
        price VARCHAR(15),
        year_built INT,
        image_url VARCHAR(255),
        zillow_link VARCHAR(255),
        agent_id INT REFERENCES agents(id),
        bio VARCHAR(255) NOT NULL,
        user_id INT REFERENCES users(id)
    );
    
      

      CREATE TABLE user_favorites (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id),
        home_id INT REFERENCES homes(id),
        UNIQUE (user_id, home_id)
      );
    `);
  } catch (err) {
    throw err;
  }
};

const insertUsers = async () => {
  try {
    for (const user of users) {
      await createUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
    console.log("Seed users data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed users data:", error);
  }
};

const insertHomes = async () => {
  try {
    for (const home of homes) {
      const formattedPrice = home.price.toLocaleString(); // Format price with commas
      await db.query(
        `
        INSERT INTO homes (address, city, state, bedrooms, bathrooms, square_feet, price, year_built, image_url, zillow_link, agent_id, bio, user_id)
        VALUES 
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);
      `,
        [
          home.address,
          home.city,
          home.state,
          home.bedrooms,
          home.bathrooms,
          home.square_feet,
          formattedPrice,
          home.year_built,
          home.image_url,
          home.zillow_link,
          home.agent_id,
          home.bio,
          home.user_id,
        ]
      );
    }
    console.log("Seed homes data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed homes data:", error);
  }
};

const insertAgents = async () => {
  try {
    for (const agent of agents) {
      await db.query(`
          INSERT INTO agents (name, email, phone_number, image_url)
          VALUES 
              ('${agent.name}', '${agent.email}', '${agent.phone_number}', '${agent.image_url}');
      `);
    }
    console.log("Seed agents data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed agents data:", error);
  }
};

const insertFavorites = async () => {
  try {
    for (const favorite of favorites) {
      for (const home_id of favorite.home_id) {
        await db.query(`
          INSERT INTO user_favorites (user_id, home_id)
          VALUES (${favorite.user_id}, ${home_id});
        `);
      }
    }
    console.log("Seed favorites data inserted successfully.");
  } catch (error) {
    console.error("Error inserting seed favorites data:", error);
  }
};

const seedDatabase = async () => {
  try {
    db.connect();
    await dropTables();
    await createTables();
    await insertUsers();
    await insertAgents();
    await insertHomes();
    await insertFavorites();
  } catch (err) {
    throw err;
  } finally {
    db.end();
  }
};

seedDatabase();
