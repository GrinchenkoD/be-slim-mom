// ! business logic
const { createNewUserSchema } = require('../../helpers/createNewUserSchema')
require('dotenv').config()
const {
  findUser,
  findUserAndUpdate,
  findUserByParam,
} = require('./auth.methods')
const UserSchema = require('../../schemas/users.js')
const bCrypt = require('bcryptjs')
const loginValidation = require('../../helpers/Joi/login.schema')
const User = require('../../schemas/users')
const validatePassword = require('../../helpers/passwordHelpers/passwordValidation')
const secret = process.env.SECRET
const jwt = require('jsonwebtoken')

// ? REGISTRATION //
const createNewUser = async (req, res, next) => {
  const { value, error } = createNewUserSchema.validate(req.body)
  const { name, login, password } = value
  const loginLowerCase = login.toLowerCase()
  const user = await findUser(loginLowerCase)
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
      login: loginLowerCase,
      password: passwordHashed,
    })
    await newUser.save()
    res.status(201).json({
      user: {
        name,
        login: loginLowerCase,
      },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// ? LOGIN //

const loginController = async (req, res, next) => {
  const { value, error } = loginValidation.validate(req.body)
  if (error) {
    res.status(400).json({ message: error.message })
    return
  }
  const { password, login } = value
  const loginLowerCase = login.toLowerCase()
  try {
    const user = await findUserByParam(User, { login })

    if (user === null) {
      return res.status(404).json({ message: 'User not found' })
    }

    const passwordCheck = validatePassword(password, user.password)

    if (!user || !passwordCheck) {
      res.status(401).json({
        code: 401,
        message: 'Email or password is wrong',
      })
      return
    }
    const payload = {
      id: user.id,
      login: user.login,
    }
    const token = jwt.sign(payload, secret, { expiresIn: '1h' })
    await findUserAndUpdate(User, { login: loginLowerCase }, token)
    res.json({
      status: 'success',
      code: 200,
      data: {
        token,
      },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// ? LOGOUT //

const logOutController = async (req, res, next) => {
  const { _id } = req.user
  try {
    await findUserAndUpdate(User, { _id: _id }, null)
    res.status(200).json({ message: 'Logout success' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
module.exports = { loginController, logOutController, createNewUser }
