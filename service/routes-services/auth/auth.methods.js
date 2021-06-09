// ! mongoose db logic
const UserSchema = require('../../schemas/users.js')

const findUser = login => {
  return UserSchema.findOne({ login })
}

const findUserAndUpdate = (User, param, token) => {
  return User.findOneAndUpdate(param, { token }, { new: true })
}
const findUserByParam = (User, param) => {
  return User.findOne(param)
}

module.exports = {
  findUserAndUpdate,
  findUserByParam,
  findUser,
}
