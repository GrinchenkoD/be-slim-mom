const passport = require('passport')
const passportJWT = require('passport-jwt')
const User = require('../service/schemas/users')
const secret = process.env.SECRET
const ExtractJWT = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new Strategy(params, async (payload, done) => {
    const [user] = await User.find({ _id: payload.id })
    if (!user) {
      return done(new Error('User not found'))
    }
    try {
      done(null, user)
    } catch (error) {
      done(error)
    }
  }),
)

