//server setup
require('dotenv').config()
const express = require('express')
const path = require('path')
const http = require('http')
const app = express()

//mongoose setup
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true})

const Poll = require('./db/pollSchema')


const port = process.env.PORT || 5000

const server = app.listen(port)
const io = require('socket.io').listen(server)

app.get('/api/polls/all', (req, res) => {
  Poll.find({}).then(polls => {
    res.json(polls)
  }).catch(err => {
    console.log(err)
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'))
})

io.on('connection', socket => {
  console.log('client connected')
  socket.emit('message', {data: 'welcome to a socket'})
})

console.log(`listening on ${port}`)
