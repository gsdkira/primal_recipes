const express = require('express')
const router = express.Router()
const axios = require('axios')
const { route } = require('./auth')
const isLoggedIn = require('../middleware/isLoggedIn')
const db = require('../models')

// this is our route for paleo recipe results

router.get('/results', isLoggedIn, function(req, res){
    let paleoResults = req.query.paleoResults
// console.log('ketoResults')
    axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${paleoResults}&app_id=58a9c1a2&app_key=ab32153cf843d90e7bb4a956102855b5&health=paleo`)
    .then(paleoApiResults => {
        // console.log(paleoApiResults.data.hits)
        const pResults = paleoApiResults.data.hits
        console.log('these are the results paleo results', pResults)
        res.render('paleoRecipes/paleoResults', {pResults: pResults})
    })
    .catch(error => {
        console.log(error)
    })
})


//this is the route for the paleo search bar
router.get('/search', isLoggedIn, function(req, res){
    res.render('paleoRecipes/paleoRecipeSearch')
})


//this is the route for the paleo results page
router.post('/results', isLoggedIn, (req, res)=>{
    db.userPaleoRecipe.create({
        paleoRecipeLabel: req.body.pRecipeLabel,
        paleoRecipeUrl: req.body.pRecipeUrl,
        userId: res.locals.currentUser.id
        // console.log(req.body.recipeLabel)
        // console.log(req.body.recipeUrl)
    })
    .then(paleoCreatedFave =>{
        console.log(paleoCreatedFave)
        res.redirect('/paleoProfile')
    })
    .catch(err =>{
        console.log(err)
    })
})


module.exports = router