const express = require('express')
const router = express.Router()
// const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
const db = require('../models')



router.get('/', (req, res)=>{
    db.userKetoRecipe.findAll({
        where: {userId: res.locals.currentUser.id}
    })
        .then(foundUser =>{
    res.render('profile', {foundUser})
    // console.log(recipe)
    })
})

router.delete('/:id', (req, res) =>{
    db.userKetoRecipe.destroy ({
        where: {id: req.params.id}
    })
    .then(deletedItem => {
        res.redirect('/profile')
    })
    .catch(error =>{
        console.log(error)
    })
})


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