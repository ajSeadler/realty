const db = require('./client');

const getAllAgents = async () => {
  try {
    const result = await db.query('SELECT * FROM agents');
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getAgentById = async (agentId) => {
  try {
    const result = await db.query('SELECT * FROM agents WHERE id = $1', [agentId]);
    return result.rows[0]; // Assuming the ID is unique, so we return the first row
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAgents,
  getAgentById,
};
