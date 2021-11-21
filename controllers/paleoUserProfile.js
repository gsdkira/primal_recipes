const express = require('express')
const router = express.Router()
const axios = require('axios')
const { route } = require('./auth')
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require('../models')




router.get('/', isLoggedIn, (req, res) => {
    db.userPaleoRecipe.findAll({
        where: { userId: res.locals.currentUser.id }
    })
        .then(paleoFoundUser => {
            console.log(paleoFoundUser)
            res.render('paleoProfile', { paleoFoundUser })
            // console.log(recipe)
        })
})

module.exports = router