// db/homes.j
const db = require('./client');

// Function to get all homes
const getAllHomes = async () => {
    try {
        const result = await db.query('SELECT * FROM homes');
        return result.rows;
    } catch (error) {
        throw error;
    }
};

// Function to get a home by its ID
const getHomeById = async (homeId) => {
    try {
        const result = await db.query('SELECT * FROM homes WHERE id = $1', [homeId]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const createHome = async (homeData, userId) => {
    try {
        const { name, address, bedrooms, bathrooms, square_feet, price, year_built, image_url, zillow_link, agent_id, bio } = homeData;

        const result = await db.query(
            'INSERT INTO homes (name, address, bedrooms, bathrooms, square_feet, price, year_built, image_url, zillow_link, agent_id, bio, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
[name, address, bedrooms, bathrooms, square_feet, price, year_built, image_url, zillow_link, agent_id, bio, userId]

        );

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllHomes,
    getHomeById,
    createHome
};
