const mongoose = require('mongoose');

const FavMoviesSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    movie: {
        type: String,
        required: true,
    }
})

const FavMoviesModel = mongoose.model('Favorites',FavMoviesSchema)

module.exports =FavMoviesModel
