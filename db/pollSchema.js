const mongoose = require('mongoose')

const pollSchema = mongoose.Schema({
  question: String,
  author: String,
  options: [{
    response: String,
    votes: Number,
  }]
})

module.exports = mongoose.model('Poll', pollSchema)
