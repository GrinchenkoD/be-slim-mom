// ! mongoose db logic
const UserSchema = require('../../schemas/users.js')

const findUser = login => {
  return UserSchema.findOne({ login })
}

const findUserAndUpdate = (User, login, token) => {
  return User.findOneAndUpdate({ login: login }, { token }, { new: true })
}
const findUserByLogin = (User, login) => {
  return User.findOne({ login })
}

const findByIdAndUpdate = (User, id) => {
  return User.findOneAndUpdate({ _id: id }, { token: null }, { new: true })
}

module.exports = {
  findUserAndUpdate,
  findUserByLogin,
  findByIdAndUpdate,
  findUser,
}
