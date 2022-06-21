const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  email: String,
  password: String
})

/* Metodo */
// Encrypt
userSchema.methods.encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

// Compare Password
userSchema.methods.comparePassword = (savedPassword, password) => {
  return bcrypt.compareSync(password, savedPassword)
}

module.exports = model('Users', userSchema)