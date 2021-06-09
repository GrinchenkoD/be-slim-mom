// ! mongoose db logic
const UserSchema = require('../../schemas/users.js')

const findUser = login => {
  return UserSchema.findOne({ login })
}

const findUserAndUpdate = (User, token) => {
  return User.findOneAndUpdate(token, { new: true })
}
const findUserByLogin = (User, login) => {
  return User.findOne({ login })
}

const findByIdAndUpdate = async (User, id) => {
  await User.findByIdAndUpdate({ _id: id }, { token: null }, { new: true })
}

module.exports = {
  findUserAndUpdate,
  findUserByLogin,
  findByIdAndUpdate,
  findUser,
}
