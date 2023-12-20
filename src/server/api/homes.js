const express = require('express');
const homesRouter = express.Router();

const { getAllHomes, getHomeById } = require('../db');

// Route to get all homes
homesRouter.get('/', async (req, res) => {
  try {
    const allHomes = await getAllHomes();
    res.json(allHomes);
  } catch (error) {
    console.error('Error getting all homes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a home by its ID
homesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const home = await getHomeById(id);

    if (!home) {
      res.status(404).json({ error: 'Home not found' });
    } else {
      res.json(home);
    }
  } catch (error) {
    console.error('Error getting home by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = homesRouter;
