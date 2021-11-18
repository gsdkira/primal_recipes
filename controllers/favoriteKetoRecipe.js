const express = require('express')
const router = express.Router
const axios = require('axios')
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')
const { route } = require('./auth')
const { Model } = require('sequelize/types')


router.get('/', (req, res)=>{
    db.recipes.findAll
    .then(recipe =>{
        res.render('profile', {results: recipe})
    })
})







module.exports = router