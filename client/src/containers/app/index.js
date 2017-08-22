import React, { Component } from 'react'
import { Route, Link, Redirect } from 'react-router-dom'
import Login from '../login'
import PollList from '../polls/PollList'
import NewPoll from '../polls/NewPoll'
import SinglePoll from '../polls/SinglePoll'
import Header from './Header'

import io from 'socket.io-client'
const socket = io()

const SinglePollSocket = (props) => {
  props = {...props, socket}
  return (
    <SinglePoll {...props}/>
  )
}

const PollListSocket = (props) => {
  props = {...props, socket}
  return (
    <PollList {...props} />
  )
}

const NewPollSocket = (props) => {
  props = {...props, socket}
  return (
    <NewPoll {...props} />
  )
}

const App = () => (
  <div>
    <Header />

    <main>
      <Route exact path="/" component={PollListSocket} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/polls/all" render={PollListSocket} />
      <Route exact path="/polls/new" render={NewPollSocket} />
      <Route exact path="/polls/id/:id" render={SinglePollSocket} />
    </main>
  </div>
)

export default App
