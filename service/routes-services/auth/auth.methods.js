// ! mongoose db logic
const UserSchema = require('../../schemas/users.js')
const passport = require('passport')

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized',
      })
    }
    req.user = user
    next()
  })(req, res, next)
}

module.exports = auth
