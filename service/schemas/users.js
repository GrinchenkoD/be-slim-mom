const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  login: {
    type: String,
    required: [true, 'Login is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  token: {
    type: String,
    default: null,
  },
  products: [
    {
      date: { type: String, required: [true, 'Date is required'] },
      product: { type: String, required: [true, 'Product is required'] },
      weight: { type: Number, required: [true, 'Weight is required'] },
      calories: { type: Number },
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
})

const User = mongoose.model('user', userSchema)

module.exports = User
