import PollApi from '../api/polls'

export const ALL_POLL_FETCH_REQUEST = 'ALL_POLL_FETCH_REQUEST'
export const ALL_POLL_FETCH_SUCCESS = 'ALL_POLL_FETCH_SUCCESS'
export const ALL_POLL_FETCH_FAILURE = 'ALL_POLL_FETCH_FAILURE'
export const ONE_POLL_FETCH_REQUEST = 'ONE_POLL_FETCH_REQUEST'
export const ONE_POLL_FETCH_SUCCESS = 'ONE_POLL_FETCH_SUCCESS'
export const ONE_POLL_FETCH_FAILURE = 'ONE_POLL_FETCH_FAILURE'
export const INC_VOTE = 'INC_VOTE'

const initialState = {
  polls: [],
  fetching: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ALL_POLL_FETCH_REQUEST:
      return {
        ...state,
        fetching: true
      }

    case ALL_POLL_FETCH_SUCCESS:
      return {
        ...state,
        polls: action.payload,
        fetching: false,
      }

    case ALL_POLL_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
      }

    case ONE_POLL_FETCH_REQUEST:
      return {
        ...state,
        fetching: true
      }

    case ONE_POLL_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        polls: [...state.polls, action.payload.poll]
      }

    case ONE_POLL_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
      }

    case INC_VOTE:
      return {
        ...state,
        //return list of polls with the one vote updated using
        //immutability-helper
      }

    default:
      return state
  }
}

export const fetchOnePoll = (id) => {
  return dispatch => {
    dispatch({
      type: ONE_POLL_FETCH_REQUEST
    })

    return PollApi.fetchOnePoll(id)
      .then(data => {
        console.log(data.data)
        dispatch({
          type: ONE_POLL_FETCH_SUCCESS,
          payload: data.data
        })
      })
      .catch(err => {
        dispatch({
          type: ONE_POLL_FETCH_FAILURE,
        })
        console.log('single poll fetch failed')
      })
  }
}

export const fetchAllPolls = () => {
  return dispatch => {
    dispatch({
      type: ALL_POLL_FETCH_REQUEST
    })

    return PollApi.fetchAllPolls()
      .then(data => {
        dispatch({
          type: ALL_POLL_FETCH_SUCCESS,
          payload: data
        })
      })
      .catch(err => {
        dispatch({
          type: ALL_POLL_FETCH_FAILURE
        })
        console.log('fetch all polls failed')
      })
  }
}
