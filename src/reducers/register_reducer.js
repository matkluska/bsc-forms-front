import {REGISTER_SUCCESS, REGISTER_REQUEST, REGISTER_FAILURE} from '../actions/register_action'

function registration(state = {
  isFetching: false,
  isRegistered: false
}, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isRegistered: false,
        user: action.credentials
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isRegistered: true
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isRegistered: false,
        errorMessage: action.message
      };
    default:
      return state
  }
}

export default registration
