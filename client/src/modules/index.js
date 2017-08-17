import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import allPolls from './allPolls'

export default combineReducers({
  routing: routerReducer,
  allPolls,
})
