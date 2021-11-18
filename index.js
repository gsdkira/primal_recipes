require('dotenv').config()
const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('./config/ppConfig')
const flash = require('connect-flash')
const isLoggedIn = require('./middleware/isLoggedIn')
const axios = require('axios')
const methodOverride = require('method-override')



// views (ejs and layouts) set up
app.set('view engine', 'ejs') //ejs
app.use(ejsLayouts) //layouts

// body parser middelware
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

// session middleware
app.use(session({
    secret: process.env.SUPER_SECRET_SECRET,
    resave: false,
    saveUninitialized: true
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// flash middleware (must go AFTER session middleware)
app.use(flash())

// custom middleware
app.use((req, res, next) => {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next()
})

// controllers middleware 
app.use('/auth', require('./controllers/auth'))
app.use('/keto', require('./controllers/keto'))


// home route
app.get('/', (req, res)=>{
    res.render('home')
})

// app.get('/ketoResults', (req,res)=>{
//     res.render('ketoResults.ejs')
// })
// // profile route
app.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile')
})



app.listen(3000, ()=>{
    console.log(`process.env.SUPER_SECRET_SECRET ${process.env.SUPER_SECRET_SECRET}`)
    console.log("auth_practice running on port 3000")
})