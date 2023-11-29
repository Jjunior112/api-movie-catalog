const express = require('express');

const login = require('../controllers/loginController');

const register = require('../controllers/registerController');

const movies = require('../controllers/moviesController');

const users = require('../controllers/usersController');

const routes = express();

// users route

routes.use(users)

// get movies

routes.use(movies) 

//register route 

routes.use(register)

//login route  

routes.use(login)


module.exports = routes