const express = require('express')
const router = express.Router()
const axios = require('axios')
const { route } = require('./auth')
const isLoggedIn = require('../middleware/isLoggedIn')

//this is our route for keto recipe results

router.get('/results', isLoggedIn, function(req, res){
    let ketoResults = req.query.ketoResults
    // let label =  apiResults.data.hits.recipe.label
// console.log('ketoResults')
    axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${ketoResults}&app_id=58a9c1a2&app_key=ab32153cf843d90e7bb4a956102855b5&diet=low-carb&health=keto-friendly`)
    .then(apiResults => {
        console.log(apiResults.data.hits)
        const results = apiResults.data.hits
        res.render('ketoRecipes/ketoResults', {results: results})
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/search', isLoggedIn, function(req, res){
    res.render('ketoRecipes/ketoRecipeSearch')
})

router.get('/:keto_recipe', isLoggedIn, function(req, res){
    let ketoRecipe = req.params.keto_recipe
    console.log('this should be keto recipe details', ketoRecipe)
    axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${ketoRecipe}&app_id=58a9c1a2&app_key=ab32153cf843d90e7bb4a956102855b5&diet=low-carb&health=keto-friendly`)
    .then(apiResults=> {
        // console.log('this is apiRes.data.hits', apiRes.data.hits)
        let recipe = apiResults.data.hits.recipe
        let label = apiResults.data.hits.recipe.label
        let yield = apiResults.data.hits.recipe.yield
        let dietLabel = apiResults.data.hits.recipe.dietLabels
        let healthLabels = apiResults.data.hits.recipe.healthLabels
        let ingredients = apiResults.data.hits.recipe.ingredients.text
        let mealType = apiResults.data.hits.recipe.mealType
        let image = apiResults.data.hits.recipe.image

        res.render('ketoRecipes/ketoRecipe', {recipe: recipe, label: label, yield: yield, dietLabel: dietLabel, healthLabels: healthLabels, ingredients: ingredients, mealType: mealType, totalTime: totalTime, image: image})
    })
})


module.exports = router