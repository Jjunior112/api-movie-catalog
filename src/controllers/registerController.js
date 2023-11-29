const express = require('express')

const register = express.Router()

register.use(express.json())

const UserModel = require('../models/User.model');

const bcrypt = require('bcryptjs')

register.post('/auth/register', async (req, res) => {

    const { name, email, password, confirmPassword } = req.body

    // validação das senhas

    if (password !== confirmPassword) {
        return res.status(422).json({ msg: "As senhas devem ser iguais" })
    }
    // conferência de usuario e email 

    const userExists = await UserModel.findOne({ name: name })

    const emailExists = await UserModel.findOne({ email: email })

    // Validação do usuário 

    if (userExists) {
        return res.status(422).json({ msg: "Usuario já cadastrado" })
    }
    // Validação do email 

    if (emailExists) {
        return res.status(422).json({ msg: "Email já cadastrado" })
    }

    // password hash

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)


    try {
        const user = await UserModel.create({
            name,
            email,
            password: passwordHash
        })

        res.status(201).json({ msg: "usuário criado com sucesso!" })
    } catch (error) {
        res.status(500).send(error.message)
    }

})

module.exports = register 