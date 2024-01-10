const express = require('express');
const homesRouter = express.Router();
const { getAllHomes, getHomeById, createHome } = require('../db');
const { requireUser } = require('./utils');

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

// Route to create a home
homesRouter.post('/create', requireUser, async (req, res) => {
  try {
    // Extract home data from the request body
    const { name, address, bedrooms, bathrooms, square_feet, price, year_built, image_url, zillow_link, agent_id, bio } = req.body;

    // Get the user ID from the authenticated user
    const userId = req.user.id;

    // Create a home using the createHome function from the db
    const createdHome = await createHome({
      name,
      address,
      bedrooms,
      bathrooms,
      square_feet,
      price,
      year_built,
      image_url,
      zillow_link,
      agent_id,
      bio
    }, userId);

    // Respond with the created home
    res.status(201).json(createdHome);
  } catch (error) {
    console.error('Error creating home:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = homesRouter;
