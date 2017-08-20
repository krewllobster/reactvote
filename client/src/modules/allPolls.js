import PollApi from '../api/polls'

export const ALL_POLL_FETCH_REQUEST = 'ALL_POLL_FETCH_REQUEST'
export const ALL_POLL_FETCH_SUCCESS = 'ALL_POLL_FETCH_SUCCESS'
export const ALL_POLL_FETCH_FAILURE = 'ALL_POLL_FETCH_FAILURE'
export const ONE_POLL_FETCH_REQUEST = 'ONE_POLL_FETCH_REQUEST'
export const ONE_POLL_FETCH_SUCCESS = 'ONE_POLL_FETCH_SUCCESS'
export const ONE_POLL_FETCH_FAILURE = 'ONE_POLL_FETCH_FAILURE'
export const INC_VOTE = 'INC_VOTE'

const initialState = {
  polls: {},
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
        polls: {...state.polls, ...action.payload}
      }

    case ONE_POLL_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
      }

    case INC_VOTE:
      return {
        ...state,
        polls: {...state.polls, [action.id]: action.poll}
      }

    default:
      return state
  }
}

export const incrementVote = (poll) => {
  return dispatch => {
    dispatch({
      type: INC_VOTE,
      id: poll._id,
      poll: poll,
    })
  }
}

export const fetchOnePoll = (id) => {
  return dispatch => {
    dispatch({
      type: ONE_POLL_FETCH_REQUEST
    })

    return PollApi.fetchOnePoll(id)
      .then(res => {
        dispatch({
          type: ONE_POLL_FETCH_SUCCESS,
          payload: res.data,
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
        let obj = data.reduce((obj, val) => {
          obj[val._id] = val
          return obj
        }, {})
        console.log(obj)
        dispatch({
          type: ALL_POLL_FETCH_SUCCESS,
          payload: obj
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
