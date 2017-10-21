import {SAVE_FORM_SUCCESS, SAVE_FORM_REQUEST, SAVE_FORM_FAILURE} from '../actions/save_form_action'

function saveForm(state = {
  isFetching: false,
  isSaved: false
}, action) {
  switch (action.type) {
    case SAVE_FORM_REQUEST:
      return {
        ...state,
        isFetching: true,
        isSaved: false,
        form: action.form
      };
    case SAVE_FORM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSaved: true
      };
    case SAVE_FORM_FAILURE:
      return {
        ...state,
        isFetching: false,
        isSaved: false,
        errorMessage: action.message
      };
    default:
      return state
  }
}

export default saveForm
