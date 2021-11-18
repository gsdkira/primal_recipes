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
        // console.log(apiResults.data.hits)
        const results = apiResults.data.hits
        console.log('these are the results', results)
        res.render('ketoRecipes/ketoResults', {results: results})
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/search', isLoggedIn, function(req, res){
    res.render('ketoRecipes/ketoRecipeSearch')
})



// router.get('/:id', isLoggedIn, function(req, res){
//     let ketoIndex = req.params.id
//     console.log('this should be keto recipe details', ketoIndex)
//     axios.get(`https://api.edamam.com/api/recipes/v2/079505393c5d93b4eeb75172a50e26c8?type=public&app_id=58a9c1a2&app_key=ab32153cf843d90e7bb4a956102855b5&field=image`)
//     .then(apiRes=> {
//         // console.log('this is apiRes.data.hits', apiRes.data.hits)
//         let resultRecipe = apiRes.data.hits.recipe
//         // let label = apiRes.data.hits.recipe.label
//         // let yield = apiRes.data.hits.recipe.yield
//         // let dietLabel = apiRes.data.hits.recipe.dietLabels
//         // let healthLabels = apiRes.data.hits.recipe.healthLabels
//         // let ingredients = apiRes.data.hits.recipe.ingredients.text
//         // let mealType = apiRes.data.hits.recipe.mealType
//         // let image = apiRes.data.hits.recipe.image
//         // let url = apiRes.data.hits.recipe.url


//             res.render('ketoRecipes/ketoRecipe',{resultRecipe: resultRecipe})
        
//     })
//     .catch(error => {
//         console.log(error)
//     })
// })

// router.get('/:id', isLoggedIn, function(req, res){
//         let ketoIndex = req.params.id
//         axios.get(`https://api.edamam.com/api/recipes/v2/${ketoIndex}?type=public&app_id=58a9c1a2&app_key=ab32153cf843d90e7bb4a956102855b5`)
//     .then(apiRes=> {
//         const results = apiRes.data.hits.recipe
//         const recipe=JSON.parse(results)
//     res.render('ketoRecipes/ketoRecipe',{myRecipe: recipe[ketoIndex]})
// })
//     .catch(error => {
//         console.log(error)
//     })
// })
module.exports = router