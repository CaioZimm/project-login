require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }), 
    express.json(),
    cors()
)

// Rota - teste
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello world!' });
})

// Rotas - Auth
const authRoutes = require('../routes/authRoutes')
app.use('/auth', authRoutes)

// Rotas - Profile
const userRoutes = require('../routes/userRoutes')
app.use('/user', userRoutes)

// Conexão - Banco de dados
const dbUrl = process.env.DATABASE_URL

mongoose.connect(dbUrl)
    .then(() => {
        console.log('Vim em')
        app.listen(3000)
    })
    .catch((err) => console.log(err))