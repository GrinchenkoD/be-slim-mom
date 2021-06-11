const bCrypt = require('bcryptjs')

const validatePassword = async (password, dbPassword) => {
  return await bCrypt.compareSync(password, dbPassword)
}

module.exports = validatePassword
