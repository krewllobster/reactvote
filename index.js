//server setup
require('dotenv').config()
const express = require('express')
const path = require('path')
const http = require('http')
const app = express()
const bodyParser = require('body-parser')

//mongoose setup
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true})

const Poll = require('./db/pollSchema')



const port = process.env.PORT || 5000

const server = app.listen(port)
const io = require('socket.io').listen(server)

app.use(bodyParser.json())

app.get('/api/polls/all', (req, res) => {
  Poll.find({}).then(polls => {
    polls.map(p => p.options.map(o => o.toString()))
    res.json(polls)
  }).catch(err => {
    console.log(err)
  })
})

app.get('/api/polls/id/:id', (req, res) => {
  const userId = req.connection.remoteAddress
  Poll.findOne({_id: req.params.id})
    .then(doc => res.json({poll: {[doc.id]: doc}, userId}))
    .catch(err => console.log(err))
})

app.post('/api/polls/new', (req, res) => {
  const poll = new Poll(req.body)
  poll.save()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'))
})

io.on('connection', socket => {
  console.log('client connected')
  socket.on('increment', data => {
    Poll.findOneAndUpdate(
      {'options._id': data.opt},
      {$inc: {'options.$.votes': 1}},
      {new: true}
    )
      .then(data => {
        io.sockets.emit('pollUpdate', data)
      })
      .catch(err => console.log(err))
  })
  socket.on('newPoll', data => {
    io.sockets.emit('addPoll', data)
  })
})

console.log(`listening on ${port}`)
