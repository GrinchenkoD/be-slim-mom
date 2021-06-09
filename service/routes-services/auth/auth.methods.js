// ! mongoose db logic
const UserSchema = require('../../schemas/users.js')

const findUser = login => {
  return UserSchema.findOne({ login })
}

module.exports = { findUser }
