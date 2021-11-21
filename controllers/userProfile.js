const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const axios = require('axios')
const db = require('../models')
const methodOverride = require('method-override')


// this is route to get all favorite keto recipes from user
router.get('/', (req, res) => {
    db.userKetoRecipe.findAll({
        where: { userId: res.locals.currentUser.id }
    })
        .then(foundUser => {
            console.log(foundUser)
            res.render('profile', { foundUser })
            // console.log(recipe)
        })
})

// this is the route to get all favorite paleo recipes from user
router.get('/', (req, res) => {
    db.userPaleoRecipe.findAll({
        where: { userId: res.locals.currentUser.id }
    })
        .then(paleoFoundUser => {
            console.log(paleoFoundUser)
            res.render('profile', { paleoFoundUser })
            // console.log(recipe)
        })
})



//this is the route to get the one favorite recipe from user to edit
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


//this is the route to delete recipe from user favorite
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
    db.userKetoRecipe.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(foundRecipe => {
            console.log('This is found recipe', foundRecipe)
            foundRecipe.update({
                ketoRecipeLabel: req.body.recipeLabel
            }, {
                where: {
                    id: req.params.id
            }
        })
            foundRecipe.save()
            res.redirect('/')
        })
        .catch(error => {
            console.log(error)
        })
})

// router.put(':/id', isLoggedIn, (req,res) => {
//     db.userKetoRecipe.update({
//         ketoRecipeLabel: req.body.recipeLabel
//     })
//     where: ({
//         id: req.params.id
//     })
//     .then(foundRecipe =>{
//         console.log('this is found recipe', foundRecipe)
//         res.redirect('/')
//     })
// })


module.exports = router