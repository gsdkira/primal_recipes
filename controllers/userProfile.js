const express = require('express')
const router = express.Router()
const isLoggedIn = require('../middleware/isLoggedIn')
const axios = require('axios')
const db = require('../models')
const methodOverride = require('method-override')



router.get('/', (req, res)=>{
    db.userKetoRecipe.findAll({
        where: {userId: res.locals.currentUser.id}
    })
        .then(foundUser =>{
            console.log(foundUser)
    res.render('profile', {foundUser})
    // console.log(recipe)
    })
})

router.delete('/:id',isLoggedIn, (req, res) => {
    db.userKetoRecipe.destroy({
        where: {
            id:req.params.id
        }
    })
    .then(destroyedRecipe => {
        console.log('you removed destroyed recipe', destroyedRecipe)
        res.redirect('/profile')         
    })
    .catch(error =>{
        console.log(error)
    })
})

router.put('/:id', (req, res)=>{
    db.userKetoRecipe.findOne({
        where: {
            id:req.params.id
        }
    })
    .then(foundRecipe =>{
        res.redirect('/profile')
    })
    .catch(error =>{
        console.log(error)
    })
})

// router.delete('/:id', (req, res) =>{
//     db.userKetoRecipe.destroy ({
//         where: {
//             ketoRecipeLabel: req.body.recipeLabel,
//             ketoRecipeUrl: req.body.recipeUrl,
//             userId: res.locals.currentUser.id
//         }
//     })
//     .then(deletedItem => {
//         res.redirect('/profile')
//     })
//     .catch(error =>{
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