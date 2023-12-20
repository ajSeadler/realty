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

module.exports = {
    getAllHomes,
    getHomeById,
};
