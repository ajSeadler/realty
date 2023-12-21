const express = require('express')
const usersRouter = express.Router();
const { requireUser } = require("./utils");

const {
    createUser,
    getUser,
    getUserByEmail,
    getUserById, getUserFavorites,
    createUserFavorites,
    deleteUserFavorite
} = require('../db');

const jwt = require('jsonwebtoken')

usersRouter.get('/', async( req, res, next) => {
    try {
        const users = await getAllUsers();

        res.send({
            users
        });
    } catch ({name, message}) {
        next({name, message})
    }
});

usersRouter.post('/login', async(req, res, next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Please supply both an email and password'
        });
    }
    try {
        const user = await getUser({email, password});
        if(user) {
            const token = jwt.sign({
                id: user.id,
                email
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });

            res.send({
                message: 'Login successful!',
                token
            });
        }
        else {
            next({
                name: 'IncorrectCredentialsError',
                message: 'Username or password is incorrect'
            });
        }
    } catch(err) {
        next(err);
    }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
    try {
      
      console.log("User profile:",req.user);
      res.send(req.user);
    } catch (error) {
      next(error);
    }
  });

  usersRouter.get('/favorites', requireUser, async (req, res, next) => {
    try {
      const userId = req.user.id;
  
      // Use the function to get user favorites based on the user's ID
      const favorites = await getUserFavorites(userId);
  
      res.send({
        favorites,
      });
    } catch (error) {
      next(error);
    }
  });

  usersRouter.post('/favorites/add', requireUser, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { homeId } = req.body;

        // Check if homeId is provided in the request body
        if (!homeId) {
            return next({
                name: 'MissingDataError',
                message: 'Please provide a homeId to add to favorites.',
            });
        }

        // Use the function to create a user favorite based on the user's ID and home ID
        await createUserFavorites(userId, homeId);

        res.send({
            message: 'Favorite added successfully.',
        });
    } catch (error) {
        next(error);
    }
});

usersRouter.delete('/favorites/remove', requireUser, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { homeId } = req.body;

        // Check if homeId is provided in the request body
        if (!homeId) {
            return next({
                name: 'MissingDataError',
                message: 'Please provide a homeId to remove from favorites.',
            });
        }

        // Use the function to delete a user favorite based on the user's ID and home ID
        await deleteUserFavorite(userId, homeId);

        res.send({
            message: 'Favorite removed successfully.',
        });
    } catch (error) {
        next(error);
    }
});


usersRouter.post('/register', async(req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const _user = await getUserByEmail(email);

        if(_user) {
            next({
                name: 'UserExistsError',
                message: 'A user with that email already exists'
            });
        }

        const user = await createUser({
            name,
            email,
            password
        });

        const token = jwt.sign({
            id: user.id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: '1w'
        });

        res.send({
            message: 'Sign up successful!',
            token
        });
    } catch({name, message}) {
        next({name, message})
    }
})

module.exports = usersRouter;