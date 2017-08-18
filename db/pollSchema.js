const mongoose = require('mongoose')

const optionSchema = mongoose.Schema({
  name: String,
  votes: Number,
})

const pollSchema = mongoose.Schema({
  question: String,
  author: String,
  options: [optionSchema]
})

module.exports = mongoose.model('Poll', pollSchema)
