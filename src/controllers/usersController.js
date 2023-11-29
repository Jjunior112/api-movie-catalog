const express = require('express');

const users = express.Router()

users.use(express.json())

const UserModel = require('../models/User.model');

const checkToken = require('../middleware/checkToken');

users.get('/users/:id', checkToken, async (req, res) => {

    const id = req.params.id

    const user = await UserModel.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
    }

    res.status(200).json(user)

})

module.exports = users 