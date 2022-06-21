const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

/* Serialize */
passport.serializeUser((user, done) => {
  done(null, user.id)
})

/* Deserialize */
passport.deserializeUser( async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

/* Passport Local to SignUp */
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  const user = await User.findOne({email: email})

  if (user) {
    return done(null, false, req.flash('signUpMessage', 'Email is Already Taken'))
  } else {
    const newUser = new User()
  
    newUser.email = email
    newUser.password = newUser.encryptPassword(password)
    
    await newUser.save()
    done(null, newUser)
  }
}))

/* Passport Local to SignIn */
passport.use('local-signin', new LocalStrategy({
  usernameField: 'email', 
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {

  const user = await User.findOne({email: email})

  if (!user) {
    return done(null, false, req.flash("signUpMessage", "No User Found"))
  } 
  if (!user.comparePassword(user.password, password)) {
    return done (null, false, req.flash("signUpMessage", "Incorrect Password"))
  }
  done(null, user)

}))