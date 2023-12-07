const express = require('express');

const favMovies = express.Router();

favMovies.use(express.json());

const favMoviesModel = require('../models/favMovies.model');

favMovies.post('/favorites', checkToken, async (req,res)=>{
    {user_id, movie} = req.body 
    
    const favorites = await favMoviesModel.create(
        {
            user_id,
            movie,
        })
})

favMovies.get('favorites/:user_id',checkToken,(req,res)=>{
    
    try(
        const id = req.params.user_id
        const favorites = favMoviesModel.findOne({user_id:id})

      if(favorites){
        res.status(200).json(favorites)
      }
      else{
        res.status(200).json(message : 'Não há filmes favoritados')
      }
    )
  catch(
     res.status(404).send(error.message)
    )
   
})

module.exports = favMovies
