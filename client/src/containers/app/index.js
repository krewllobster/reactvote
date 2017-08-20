import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import PollList from '../polls/PollList'
import NewPoll from '../polls/NewPoll'
import SinglePoll from '../polls/SinglePoll'

import io from 'socket.io-client'
const socket = io()

const SinglePollSocket = (props) => {
  props = {...props, socket}
  return (
    <SinglePoll {...props}/>
  )
}

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/polls/all">All Polls</Link>
      <Link to="/polls/new">Create New Poll</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/polls/all" component={PollList} />
      <Route exact path="/polls/new" component={NewPoll} />
      <Route exact path="/polls/id/:id" render={SinglePollSocket} />
    </main>
  </div>
)

export default App
