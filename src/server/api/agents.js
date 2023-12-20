const express = require('express');
const agentsRouter = express.Router();

const { getAllAgents, getAgentById, getAgentsByHomeId } = require('../db');

// Route to get all agents
agentsRouter.get('/', async (req, res) => {
  try {
    const allAgents = await getAllAgents();
    res.json(allAgents);
  } catch (error) {
    console.error('Error getting all agents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

agentsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const agent = await getAgentById(id);

    if (!agent) {
      res.status(404).json({ error: 'Agent not found' });
    } else {
      res.json(agent);
    }
  } catch (error) {
    console.error('Error getting agent by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get agents by home ID
agentsRouter.get('/by-home/:homeId', async (req, res) => {
  const { homeId } = req.params;

  try {
    const agents = await getAgentsByHomeId(homeId);

    if (!agents || agents.length === 0) {
      res.status(404).json({ error: 'No agents found for the specified home' });
    } else {
      res.json(agents);
    }
  } catch (error) {
    console.error('Error getting agents by home ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = agentsRouter;
