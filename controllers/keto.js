const express = require('express')
const router = express.Router()
const axios = require('axios')
const { route } = require('./auth')

//this is our route for keto recipe results

router.get('/results', function(req, res){
    let ketoResults = req.query.ketoResults
    // console.log(req.query.ketoResults)
   
console.log('ketoResults')
    axios.get(`https://api.edamam.com/api/recipes/v2?q=&app_id=58a9c1a2&app_key=ab32153cf843d90e7bb4a956102855b5&diet=low-carb`)
    .then(apiResults => {
        console.log(apiResults.data)
        // const results = apiResults.data
        res.render('ketoRecipes/ketoResults')
    })
    .catch(error => {
        console.log(error)
    })
})

router.get('/search', function(req, res){
    res.render('ketoRecipes/ketoRecipeSearch')
})
// router.get('/ketoResults', function(req, res){
//     res.render('ketoRecipes/ketoResults')
// })

module.exports = router