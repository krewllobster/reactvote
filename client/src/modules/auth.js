export const SET_AUTH = 'SET_AUTH'
export const UNSET_AUTH = 'UNSET_AUTH'

const initialState = {
  name: null,
  id: null,
  authed: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        name: action.name,
        id: action.id,
        authed: true
      }

    case UNSET_AUTH:
      return {
        ...state,
        name: null,
        id: null,
        authed: null,
      }

    default:
      return state
  }
}

export const setLogin = (auth) => {
  return dispatch => {
    dispatch({
      type: SET_AUTH,
      name: auth.name,
      id: auth.id
    })
    localStorage.setItem('krewll-vote-login',
      JSON.stringify({name: auth.name, id: auth.id}))
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: UNSET_AUTH,
    })
  }
}
