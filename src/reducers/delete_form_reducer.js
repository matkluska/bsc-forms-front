import {DELETE_FORM_FAILURE, DELETE_FORM_SUCCESS, DELETE_FORM_REQUEST} from 'actions/delete_form_action'

function deleteForm(state = {
  isFetching: false,
  isDeleted: false
}, action) {
  switch (action.type) {
    case DELETE_FORM_REQUEST:
      return {
        ...state,
        isDeleted: false,
        isFetching: true,
        formId: action.formId
      };
    case DELETE_FORM_SUCCESS:
      return {
        ...state,
        isDeleted: true,
        isFetching: false
      };
    case DELETE_FORM_FAILURE:
      return {
        ...state,
        isDeleted: false,
        isFetching: false,
        errorMessage: action.message
      };

    default:
      return state
  }
}

export default deleteForm
