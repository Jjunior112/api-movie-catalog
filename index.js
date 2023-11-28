require('dotenv').config()

const cors = require('cors')

const express = require('express');

const rateLimiter = require('./src/Limiter/rateLimiter');

const connectToDatabase = require('./src/database/connect');

const server = express()

const routes = require('./src/routes/routes')

connectToDatabase()

server.use(rateLimiter)

server.use(cors())

server.use(routes)

// public route

server.get('/', (req, res) => {
    try {
        res.status(200).json("Bem vindo a nossa API")
    } catch (error) {
        res.status(404).json(error.message)
    }
})

server.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}/`)

})