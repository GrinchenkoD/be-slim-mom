// ! business logic

const { createNewUserSchema } = require('../../helpers/createNewUserSchema')
const { findUser } = require('./auth.methods')
const UserSchema = require('../../schemas/users.js')
const bCrypt = require('bcryptjs')

const createNewUser = async (req, res, next) => {
  const { value, error } = createNewUserSchema.validate(req.body)
  const { name, login, password } = value
  const user = await findUser(login)
  if (error) {
    return res.status(400).json({ message: error.message })
  }
  if (user) {
    return res
      .status(401)
      .json({ message: `Such login(${login}) already exists` })
  }
  try {
    const passwordHashed = await bCrypt.hash(
      password,
      await bCrypt.genSalt(Number(process.env.PASSWORD_SALT)),
    )
    const newUser = new UserSchema({
      name,
      login,
      password: passwordHashed,
    })
    await newUser.save()
    res.status(201).json({
      user: {
        name,
        login,
      },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { createNewUser }
