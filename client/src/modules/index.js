import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import allPolls from './allPolls'
import newPoll from './newPoll'

export default combineReducers({
  routing: routerReducer,
  allPolls,
  newPoll,
})
