const express = require('express')
const router = express.Router()
const axios = require('axios')
const { route } = require('./auth')

//this is our route for keto recipe results

router.get('/results', function(req, res){
    let ketoResults = req.query.ketoResults 
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

router.get('/search', function(req, res){
    res.render('ketoRecipes/ketoRecipeSearch')
})

router.get('/:keto_details', function(req, res){
    let ketoSearch = req.params.keto_details
    console.log('this should be keto recipe details', ketoSearch)
    axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${ketoResults}&app_id=58a9c1a2&app_key=ab32153cf843d90e7bb4a956102855b5&diet=low-carb&health=keto-friendly`)
    .then(apiRes=> {
        console.log('this is apiRes.data.hits', apiRes.data.hits)
        let label = apiRes.data.hits.recipe.label
        let yield = apiRes.data.hits.recipe.yield
        let dietLabel = apiRes.data.hits.recipe.dietLabels
        let healthLabels = apiRes.data.hits.recipe.healthLabels
        let ingredients = apiRes.data.hits.recipe.ingredients
        let mealType = apiRes.data.hits.recipe.mealType
        let totalTime = apiRes.data.hits.recipe.totalTime
        let image = apiRes.data.hits.recipe.image

        res.render('ketoRecipes/ketoDetails', {label: label, yield: yield, dietLabel: dietLabel, healthLabels: healthLabels, ingredients: ingredients, mealType: mealType, totalTime: totalTime, image: image})
    })
})


module.exports = router