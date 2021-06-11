const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = new Schema({
  categories: {
    type: Array,
  },
  weight: {
    type: Number,
  },
  title: {
    type: Object,
  },
  calories: {
    type: Number,
  },
  groupBloodNotAllowed: {
    type: Array,
  },
})

const Product = mongoose.model('product', productSchema)
module.exports = Product
