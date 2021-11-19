const express = require('express')
const router = express.Router()
// const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
const db = require('../models')
const methodOverride = require('method-override')


router.get('/', (req, res)=>{
    db.userKetoRecipe.findAll()
        .then(recipe =>{
    res.render('profile', {recipe})
    })
})

// router.post('/', isLoggedIn, (req, res)=>{
//     console.log(req.query.recipe)
//     console.log(req.body)
//     res.redirect('/')
// })

// router.get('/', isLoggedIn, (req, res) => {
//     db.ketoRecipe.findAll()
//     .then(recipe =>{
//         res.render('profile', {results: recipe})
//     })
// })


// router.post('/', isLoggedIn, (req, res) => {
//     console.log(req.body.recipe)
//     db.ketoRecipe.create({
//         url = apiRes.data.hits.recipe.url
//     })
//     .then(createdFave =>{
//         res.redirect('/profile')
//     })
//     .catch(error => {
//         console.log(error)
//     })
// })

// Get route that will display saved recipes
// router.get('/', (req, res)=>{
//     db.userKetoRecipe.findAll ({
//     where: {userId:req.params.userId}
// })
//     .then(found =>{
//         res.render('profile', {currentUser: req.params.userId, results:found})
//     })
// })



// post route that will save a recipe url  to a userKetoRecipe
// router.post('/:url', isLoggedIn, (req, res) => {
//     const formData = req.body.url
//     console.log(req.body.url)
//     // db.ketoRecipe.findOne({
//     //     where: { url: req.params.url }
//     // })
//     //     .then(savedCreated => {
//     //         res.redirect('/profile', savedCreated)
//     //     })
//     //     .catch(error => {
//     //         console.log(error)
//     //     })
// })

module.exports = router