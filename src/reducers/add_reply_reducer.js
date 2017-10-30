import {ADD_REPLY_FAILURE, ADD_REPLY_SUCCESS, ADD_REPLY_REQUEST} from 'actions/add_reply_action'

function addReply(state = {
  isFetching: false,
  isAdded: false
}, action) {
  switch (action.type) {
    case ADD_REPLY_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAdded: false,
        reply: action.reply,
        formId: action.formId
      };
    case ADD_REPLY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAdded: true
      };
    case ADD_REPLY_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAdded: false,
        errorMessage: action.message
      };
    default:
      return state
  }
}

export default addReply
