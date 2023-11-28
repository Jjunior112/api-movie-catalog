require('dotenv').config()

const cors = require('cors')

const express = require('express');

const rateLimit = require('express-rate-limit');

const connectToDatabase = require('./src/database/connect');

const server = express()

const routes = require('./src/routes/routes')

connectToDatabase()

const apiRequestLimiter = rateLimit({
    windowsMs: 1 * 60 * 1000,
    max: 50
})

server.use(apiRequestLimiter)

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