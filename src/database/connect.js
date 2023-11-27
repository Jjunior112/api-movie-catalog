const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@auth-jwt.owsilo9.mongodb.net/?retryWrites=true&w=majority`)
        console.log('conectou ao banco')

    } catch (error) {
        console.log('falha na conexão ', error)
    }
}

module.exports = connectToDatabase