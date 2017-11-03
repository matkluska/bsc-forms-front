import {LIST_FORMS_FAILURE, LIST_FORMS_REQUEST, LIST_FORMS_SUCCESS} from 'actions/list_forms_action'

function listForms(state = {
  isFetching: false,
  isListed: false
}, action) {
  switch (action.type) {
    case LIST_FORMS_REQUEST:
      return {
        ...state,
        isListed: false,
        isFetching: true,
        formId: action.formId
      };
    case LIST_FORMS_SUCCESS:
      return {
        ...state,
        isListed: true,
        isFetching: false,
        forms: action.forms
      };
    case LIST_FORMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isListed: false,
        errorMessage: action.message
      };

    default:
      return state
  }
}

export default listForms
