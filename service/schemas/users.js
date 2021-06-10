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
  dailyCalories: {
    type: Number,
    default: 0,
  },
  forbidenCategories: [String],
  dates: [
    {
      date: { type: String, required: [true, 'Date is required'] },
      caloriesReceived: { type: Number, default: 0 },
      products: [
        {
          id: { type: String, required: [true, 'Title is required'] },
          title: { type: String, required: [true, 'Title is required'] },
          category: {
            type: String,
            required: [true, 'category is required'],
          },
          weight: {
            type: Number,
            required: [true, 'Weight is required'],
          },
          calories: {
            type: Number,
            required: [true, 'Calories are required'],
          },
        },
      ],
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
})

const User = mongoose.model('user', userSchema)

module.exports = User
