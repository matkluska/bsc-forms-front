import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS} from '../actions/auth_action'

function auth(state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem('access_token')
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errorMessage: '',
        user: action.credentials
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false
      };
    default:
      return state
  }
}

export default auth
