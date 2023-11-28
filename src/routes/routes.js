const express = require('express');

const UserModel = require('../models/User.model');

const checkToken = require('../middleware/middleware');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const routes = express.Router();

const fetch = require('node-fetch');

routes.use(express.json())

// Private Route

routes.get('/users/:id', checkToken, async (req, res) => {

    const id = req.params.id

    const user = await UserModel.findById(id, '-password')

    if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
    }

    res.status(200).json(user)

})

// get movies

routes.get('/movies', checkToken, async (req, res) => {
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
        .then(json => res.status(200).json(json))
        .catch(err => console.error('error:' + err));

})

// route register

routes.post('/auth/register', async (req, res) => {


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

// route login 

routes.post('/auth/login', async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório" })
    }
    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória" })
    }
    const user = await UserModel.findOne({ email: email })

    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" })
    }
    // check password

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({ msg: 'Senha inválida' })
    }

    try {
        const secret = process.env.SECRET

        const token = jwt.sign({
            id: user._id

        }, secret,)

        res.status(200).json({ msg: 'autenticação realizada com sucesso', token })
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = routes