const errorWrapper = middleware => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }
}

module.exports = errorWrapper
