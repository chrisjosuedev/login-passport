const express = require('express')
const router = express.Router()
const passport = require('passport')
const { isAuthenticated, isLogged } = require('../lib/auth')

// Main
router.get('/', isAuthenticated, (req, res, next) => {
  res.render('index')
})

// Sign Up
router.get('/signup', isLogged, (req, res, next) => {
  res.render('signup')
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  passReqToCallback: true
}))

// Sign In
router.get('/signin', isLogged, (req, res) => {
  res.render('signin')
})

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin',
  passReqToCallback: true
}))

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if(err) {
      console.log(err)
    }
    res.redirect('/signin')
  })
  
})




module.exports = router