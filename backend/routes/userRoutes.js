const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const routes = express.Router()
const User = require('../models/User')

routes.get('/', async (req, res) => {
    res.status(200).json({message: 'deu, se deu, deu né'})
})

routes.patch('/:id', async (req, res) => {
    
    const id = req.params.id
    const { name, email } = req.body

    const user = {
        name,
        email
    }

    try {
        const updatedUser = await User.updateOne({_id: id}, user)

        if(updatedUser.matchedCount === 0){
            res.status(404).json({ message: 'Usuário não encontrado'})
            return
        }
        
    } catch (error) {
        return res.status(500).json({ message: error })
    }
})

routes.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    const user = await User.deleteOne({_id: id})

    if(!user){
        res.status(404).json({ message: 'Usuário não encontrado'})
    }

    try {
        
    } catch (error) {
        
    }
})

module.exports = routes