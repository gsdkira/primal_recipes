const express = require('express')
const router = express.Router()
const axios = require('axios')

//this is our route for keto recipe results

router.get('/ketoResults', function(req, res){
    let kResults = req.query.kResults
    // console.log(req.query.ketoRecipe)

    axios.get(`https://api.edamam.com/api/recipes/v2?q=${kResults}&app_id=${process.env.EDM_APP_ID}&app_key=${process.env.EDM_API_KEY}`)
    .then(apiRes => {
        // const results = apiResults
        console.log(apiRes.data)
    })


})


module.exports = router