const express = require('express');
const agentsRouter = express.Router();

const { getAllAgents, getAgentsById } = require('../db');

agentsRouter.get('/', async (req, res) => {
  try {
    const allAgents = await getAllAgents();
    res.json(allAgents);
  } catch (error) {
    console.error('Error getting all agents:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = agentsRouter;