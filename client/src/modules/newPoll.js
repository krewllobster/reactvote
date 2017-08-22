import PollApi from '../api/polls'
import io from 'socket.io-client'
const socket = io()

export const NEW_POLL_POST_REQUEST = 'NEW_POLL_POST_REQUEST'
export const NEW_POLL_POST_SUCCESS = 'NEW_POLL_POST_SUCCESS'
export const NEW_POLL_POST_FAILURE = 'NEW_POLL_POST_FAILURE'

const initialState = {
  poll: {},
  posting: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_POLL_POST_REQUEST:
      return {
        ...state,
        posting: true
      }

    case NEW_POLL_POST_FAILURE:
      return {
        ...state,
        posting: false
      }

    case NEW_POLL_POST_SUCCESS:
      return {
        ...state,
        poll: action.payload,
        posting: false,
      }

    default:
      return state
  }
}

export const postNewPoll = (poll) => {
  return dispatch => {
    dispatch ({
      type: NEW_POLL_POST_REQUEST,
    })

    return PollApi.createPoll(poll)
      .then(res => {
        dispatch({
          type: NEW_POLL_POST_SUCCESS,
          payload: res,
        })
        return res
      })
      .catch(err => {
        dispatch({
          type: NEW_POLL_POST_FAILURE,
        })
      })
  }
}
