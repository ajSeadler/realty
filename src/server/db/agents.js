const db = require('./client');

// Function to get all agents
const getAllAgents = async () => {
  try {
    const result = await db.query('SELECT * FROM agents');
    return result.rows;
  } catch (error) {
    throw error;
  }
};

// Function to get an agent by ID
const getAgentById = async (agentId) => {
  try {
    const result = await db.query('SELECT * FROM agents WHERE id = $1', [agentId]);
    return result.rows[0]; // Assuming the ID is unique, so we return the first row
  } catch (error) {
    throw error;
  }
};

// Function to get agents associated with a specific home
const getAgentsByHomeId = async (homeId) => {
  try {
    const result = await db.query('SELECT agents.* FROM agents JOIN homes ON agents.id = homes.agent_id WHERE homes.id = $1', [homeId]);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllAgents,
  getAgentById,
  getAgentsByHomeId,
};
