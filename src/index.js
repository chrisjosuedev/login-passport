require('dotenv').config()
const express = require('express')
const engine = require('ejs-mate')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')

/* --- Inicialization --- */
const app = express()
require('./db')
require('./passport/local-auth')

/* --- Settings --- */

// Template Engine EJS
app.engine('ejs', engine)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.set('port', 3000 || process.env.PORT)
const port = app.get('port')

/* --- Middleware --- */
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(session({
   secret: process.env.SECRET_SESSION,
   resave: false,
   saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

/* Messages Flash */
app.use((req, res, next) => {
  app.locals.signUpMessage = req.flash("signUpMessage")
  next()
})


/* --- Require Routes --- */
app.use(require('./routes/index'))

/* --- Server --- */

// Server Running
app.listen(port, _ => {
  console.log('Server on port', port)
})