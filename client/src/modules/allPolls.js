import PollApi from '../api/polls'

export const ALL_POLL_FETCH_REQUEST = 'ALL_POLL_FETCH_REQUEST'
export const ALL_POLL_FETCH_SUCCESS = 'ALL_POLL_FETCH_SUCCESS'
export const ALL_POLL_FETCH_FAILURE = 'ALL_POLL_FETCH_FAILURE'

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

    default:
      return state
  }
}

export const fetchAllPolls = () => {
  return dispatch => {
    dispatch({
      type: ALL_POLL_FETCH_REQUEST
    })

    return PollApi.fetchAllPolls()
      .then(res => {
        dispatch({
          type: ALL_POLL_FETCH_SUCCESS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: ALL_POLL_FETCH_FAILURE
        })
      })
  }
}
