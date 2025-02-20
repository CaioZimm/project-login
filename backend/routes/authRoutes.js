const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const routes = express.Router()
const User = require('../models/User')

routes.post('/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    if(password !== confirmpassword){
        return res.status(422).json({ error: 'As senhas estão diferentes' })
    }

    const userExists = await User.findOne({ email: email})

    if(userExists){
        return res.status(422).json({ message: 'Email já cadastrado!'})
    }

    // Senha Criptografada
    const salt = await bcrypt.genSalt(12)
    const passwordCript = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: passwordCript,
    })

    try {
        await user.save()

        return res.status(201).json({ message: 'Usuário criado com sucesso', data: user})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error})
    }

})

routes.post('/login', async (req, res) => {

    const { email, password } = req.body
    
    if(!email || !password){
        return res.status(500).json({ message: 'O campo email e senha são obrigatórios!' })
    }

    const userExists = await User.findOne({ email: email })

    if(!userExists){
        return res.status(404).json({message: 'Usuário não encontrado'})
    }

    const checkPassword = await bcrypt.compare(password, userExists.password)

    if(!checkPassword){
        return res.status(422).json({ message: "Senha inválida"})
    }

    try {
        return res.status(200).json({message: 'Logado com sucesso', data: userExists})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
})

module.exports = routes