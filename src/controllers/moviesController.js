const express = require('express');

const movies = express.Router()

movies.use(express.json())

const fetch = require('node-fetch');



const checkToken = require('../middleware/checkToken');



movies.get('/movies', checkToken, async (req, res) => {
    const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    const options = {
        method: 'GET', 
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.API_KEY}`
        }
    };
    await fetch(url, options)

        .then(res => res.json())
        .then(json => {
           
            res.status(200).json(json)
        })
        .catch(err => console.error('error:' + err));

})

module.exports = movies 