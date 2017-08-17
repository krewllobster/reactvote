import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import PollList from '../polls/PollList'
import NewPoll from '../polls/NewPoll'

const App = () => (
  <div>
    <header>
      <Link to="/polls/all">All Polls</Link>
      <Link to="/polls/new">Create New Poll</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/polls/all" component={PollList} />
      <Route exact path="/polls/new" component={NewPoll} />
    </main>
  </div>
)

export default App
