import {GET_FORM_FAILURE, GET_FORM_NOT_FOUND, GET_FORM_REQUEST, GET_FORM_SUCCESS} from '../actions/get_form_action'

function getForm(state = {
  isFetching: false,
  isFound: false,
  isNotFound: false
}, action) {
  switch (action.type) {
    case GET_FORM_REQUEST:
      return {
        ...state,
        isFound: false,
        isNotFound: false,
        isFetching: true,
        formId: action.formId
      };
    case GET_FORM_SUCCESS:
      return {
        ...state,
        isFound: true,
        isNotFound: false,
        isFetching: false,
        form: action.form
      };
    case GET_FORM_NOT_FOUND:
      return {
        ...state,
        isFound: false,
        isNotFound: true,
        isFetching: false,
        formId: action.formId
      };
    case GET_FORM_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFound: false,
        isNotFound: false,
        errorMessage: action.message
      };

    default:
      return state
  }
}

export default getForm
