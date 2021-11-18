const express = require('express')
const router = express.Router
const axios = require('axios')
const db = require('../models')
const isLoggedIn = require('../middleware/isLoggedIn')
const { route } = require('./auth')
const { Model } = require('sequelize/types')

//Get route that will display saved recipes
router.get('/', (req, res)=>{
    db.ketoRecipe.findAll ({
    where: {userId:req.params.userId}
})
    .then(found =>{
        res.render('profile', {recipe: recipe, currentUser: req.params.userId, results:found})
    })
})


//delete that will remove a saved restaurnt 
router.post('/delete/:url', isLoggedIn, (req,res) => {
    db.userKetoRecipe.destroy ({
        where: {url: req.params.url}
})
.then(deletedRecipe => {
    console.log('you deleted:', deletedRecipe)
    //where do you want to load after you delete.
    res.redirect('/profile')
})
.catch(error =>{
    console.log(error)
})
})

//post route that will save a recipe url  to a userKetoRecipe
router.post('/:url', isLoggedIn, (req, res) => {
    db.userKetoRecipe.findOne({
       where: {url: req.params.url}
    })
.then(savedCreated => {
    res.redirect('/profile', savedCreated)
})
.catch(error => {
    console.log(error)
})
// } else {
//     console.log('You already saved this recipe')
// }
// })



module.exports = router