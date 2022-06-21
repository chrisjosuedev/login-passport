module.exports = {

  isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
  },

  isLogged (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/')
    }
    return next()
  }


}