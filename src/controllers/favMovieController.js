const express = require('express');

const favMovies = express.Router();

const checkToken = require('../middleware/checkToken');

favMovies.use(express.json());

const favMoviesModel = require('../models/favMovies.model');

favMovies.post('/favorites/:id',checkToken, async (req, res) => {
  const user_id = req.params.id 
  const  movie  = req.body.movie

  const favorites = await favMoviesModel.create(
    {
      
      movie,
      user_id
    })
    res.status(201).json(favorites)
})

favMovies.get('/favorites/:id', checkToken, async (req, res) => {

  try {
    const id = req.params.id
    const favorites = await favMoviesModel.find({ user_id: id })

    if (favorites) {
      res.status(200).json(favorites)
    }
    else {
      res.status(200).json({ message : 'Não há filmes favoritados' })
    }
  }
  catch {
    res.status(404).send('Falha no servidor!')
  }

})

module.exports = favMovies
