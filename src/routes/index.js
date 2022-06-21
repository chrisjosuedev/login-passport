const express = require('express')
const router = express.Router()
const passport = require('passport')

// Main
router.get('/', isAuthenticated, (req, res, next) => {
  res.render('index')
})

// Sign Up
router.get('/signup', (req, res, next) => {
  res.render('signup')
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signup',
  passReqToCallback: true
}))

// Sign In
router.get('/signin', (req, res) => {
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

// Middleware isAuthenticate
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/signin')
}

module.exports = router