const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const axios = require('axios')
const db = require('../models')
const methodOverride = require('method-override')



// this is route to get all favorite keto recipes from user
router.get('/', isLoggedIn, (req, res) => {
    db.userKetoRecipe.findAll({
        where: { userId: res.locals.currentUser.id }
    })
        .then(foundUser => {
            console.log(foundUser)
            res.render('profile', { foundUser })
            console.log('foundUser', foundUser)
        })
})



//this is the route to get the one favorite keto recipe from user to edit
router.get('/', isLoggedIn, (req, res) => {
    // console.log('this is getting for editing')
    db.userKetoRecipe.findOne({
        where: {
            ketoRecipeLabel: req.body.recipeLabel
        }
    })
        .then(findRecipe => {
            console.log(findRecipe)
            res.render('profile', { findRecipe })
            // console.log(recipe)
        })
        .catch(error => {
            console.log(error)
        })
})


//this is the route to delete keto recipe from user favorite
router.delete('/:id', isLoggedIn, (req, res) => {
    db.userKetoRecipe.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(destroyedRecipe => {
            console.log('you removed destroyed recipe', destroyedRecipe)
            res.redirect('/profile')
        })
        .catch(error => {
            console.log(error)
        })
})


//this is to put edited recipe name to favorite list
router.put('/:id', isLoggedIn, (req, res) => {
    console.log(req.body)
    db.userKetoRecipe.update({
        ketoRecipeLabel: req.body.ketoRecipeLabel
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(foundRecipe => {
            console.log(foundRecipe)
            res.redirect('/profile')

        })
})



module.exports = router