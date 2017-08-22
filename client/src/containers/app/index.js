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

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={
        (props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
      }
    />
  )
}

const App = () => (
  <div>
    <Header />

    <main>
      <Route exact path="/" component={PollList} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/polls/all" component={PollList} />
      <Route exact path="/polls/new" component={NewPoll} />
      <Route exact path="/polls/id/:id" render={SinglePollSocket} />
    </main>
  </div>
)

export default App
