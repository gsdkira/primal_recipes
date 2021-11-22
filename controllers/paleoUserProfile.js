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

router.get('/', isLoggedIn, (req, res) => {
    // console.log('this is getting for editing')
    db.userpaleoRecipe.findOne({
        where: {
            paleoRecipeLabel: req.body.pRecipeLabel
        }
    })
        .then(findPaleoRecipe => {
            console.log(findPaleoRecipe)
            res.render('profile', { findPaleoRecipe })
            // console.log(recipe)
        })
        .catch(error => {
            console.log(error)
        })
})


//this is the route to delete keto recipe from user favorite
router.delete('/:id', isLoggedIn, (req, res) => {
    db.userPaleoRecipe.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(destroyedPaleoRecipe => {
            console.log('you removed destroyed recipe', destroyedPaleoRecipe)
            res.redirect('/paleoProfile')
        })
        .catch(error => {
            console.log(error)
        })
})


//this is to put edited recipe name to favorite list
router.put('/:id', isLoggedIn, (req, res) => {
    console.log(req.body)
    db.userPaleoRecipe.update({
        paleoRecipeLabel: req.body.paleoRecipeLabel
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(foundPaleoRecipe => {
            console.log(foundPaleoRecipe)
            res.redirect('/paleoProfile')

        })
})

module.exports = router