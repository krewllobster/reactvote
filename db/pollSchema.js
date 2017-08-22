const mongoose = require('mongoose')
const shortid = require('shortid')

const optionSchema = mongoose.Schema({
  _id: {type: String, 'default': shortid.generate},
  name: String,
  votes: Number,
})

const userSchema = mongoose.Schema({
  _id: {type: String, 'default': shortid.generate},
  name: String,
  id: String,
})

const pollSchema = mongoose.Schema({
  _id: {type: String, 'default': shortid.generate},
  question: String,
  author: String,
  voters: [userSchema],
  options: [optionSchema]
})

module.exports = mongoose.model('Poll', pollSchema)
