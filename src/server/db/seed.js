// Import necessary modules
const db = require('./client');
const { createUser } = require('./users');

// Sample user data
const users = [
  {
    name: 'Emily Johnson',
    email: 'emily@example.com',
    password: 'securepass',
  },
  {
    name: 'Liu Wei',
    email: 'liu@example.com',
    password: 'strongpass',
  },
  {
    name: 'Isabella García',
    email: 'bella@example.com',
    password: 'pass1234',
  },
  {
    name: 'Mohammed Ahmed',
    email: 'mohammed@example.com',
    password: 'mysecretpassword',
  },
  {
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
  },
  // Add more user objects as needed
];

// Sample homes data
const homes = [
  {
    address: '123 Main St',
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 2000,
    price: 300000,
    year_built: 1990,
    image_url: './images/house2.jpeg',
    zillow_link: 'https://www.zillow.com/example1',
  },
  {
    address: '456 Oak Ave',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2500,
    price: 400000,
    year_built: 2005,
    image_url: './images/house10.jpeg',
    zillow_link: 'https://www.zillow.com/example2',
  },
  {
    address: '734 West Liberty St.',
    bedrooms: 4,
    bathrooms: 3.5,
    square_feet: 2300,
    price: 330000,
    year_built: 1997,
    image_url: './images/house5.jpeg',
    zillow_link: 'https://www.zillow.com/example1',
  },
  {
    address: '896 Crimson Rd.',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2700,
    price: 430000,
    year_built: 1919,
    image_url: './images/house4.jpeg',
    zillow_link: 'https://www.zillow.com/example2',
  },
  {
    address: '144 Second St',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 3000,
    price: 420000,
    year_built: 2009,
    image_url: './images/house6.jpeg',
    zillow_link: 'https://www.zillow.com/example1',
  },
  {
    address: '3390 West Fern Ave',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2900,
    price: 440000,
    year_built: 2005,
    image_url: './images/house7.jpeg',
    zillow_link: 'https://www.zillow.com/example2',
  },
  {
    address: '998 Coral Ave',
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 2700,
    price: 440000,
    year_built: 2010,
    image_url: './images/house8.jpeg',
    zillow_link: 'https://www.zillow.com/example1',
  },
  {
    address: '648 Cherry Ave',
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2900,
    price: 500000,
    year_built: 2008,
    image_url: './images/house9.jpeg',
    zillow_link: 'https://www.zillow.com/example2',
  },
  // Add more home objects as needed
];

// Function to drop existing tables
const dropTables = async () => {
    try {
        await db.query(`
        DROP TABLE IF EXISTS users, homes;
        `);
    }
    catch(err) {
        throw err;
    }
};

// Function to create tables
const createTables = async () => {
    try {
        await db.query(`
        CREATE TABLE users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) DEFAULT 'name',
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );

        CREATE TABLE homes(
            id SERIAL PRIMARY KEY,
            address VARCHAR(255) NOT NULL,
            bedrooms INT,
            bathrooms FLOAT,
            square_feet INT,
            price DECIMAL(10, 2),
            year_built INT,
            image_url VARCHAR(255),
            zillow_link VARCHAR(255)
        );
        `);
    }
    catch(err) {
        throw err;
    }
};

// Function to insert sample users
const insertUsers = async () => {
    try {
        for (const user of users) {
            await createUser({ name: user.name, email: user.email, password: user.password });
        }
        console.log('Seed users data inserted successfully.');
    } catch (error) {
        console.error('Error inserting seed users data:', error);
    }
};

// Function to insert sample homes
const insertHomes = async () => {
    try {
        for (const home of homes) {
            await db.query(`
                INSERT INTO homes (address, bedrooms, bathrooms, square_feet, price, year_built, image_url, zillow_link)
                VALUES 
                    ('${home.address}', ${home.bedrooms}, ${home.bathrooms}, ${home.square_feet}, ${home.price}, ${home.year_built}, '${home.image_url}', '${home.zillow_link}');
            `);
        }
        console.log('Seed homes data inserted successfully.');
    } catch (error) {
        console.error('Error inserting seed homes data:', error);
    }
};

// Function to seed the database with users and homes
const seedDatabase = async () => {
    try {
        db.connect();
        await dropTables();
        await createTables();
        await insertUsers();
        await insertHomes();
    }
    catch (err) {
        throw err;
    }
    finally {
        db.end();
    }
};

// Call the function to seed the database
seedDatabase();
