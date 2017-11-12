import conf from 'config'

export const LIST_FORMS_REQUEST = 'LIST_FORMS_REQUEST';
export const LIST_FORMS_SUCCESS = 'LIST_FORMS_SUCCESS';
export const LIST_FORMS_FAILURE = 'LIST_FORMS_FAILURE';

function requestListForms() {
  return {
    type: LIST_FORMS_REQUEST,
    isListed: false,
    isFetching: true
  }
}

function receiveListForms(forms) {
  return {
    type: LIST_FORMS_SUCCESS,
    isListed: true,
    isFetching: false,
    forms
  }
}

function listFormsError(message) {
  return {
    type: LIST_FORMS_FAILURE,
    isListed: false,
    isFetching: false,
    message
  }
}

export function listForms() {
  let config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  };
  return dispatch => {
    dispatch(requestListForms());
    let url = `${conf.serverURL}form-service/forms`;
    return fetch(url, config)
      .then(response => {
          if (response.ok) {
            console.log('ok');
            response.json().then(forms => {
              dispatch(receiveListForms(forms));
            })
          } else {
            response.json().then(error => {
              console.log('error');
              dispatch(listFormsError(error.error_description));
            })
          }
        }
      )
      .catch(err => console.error('Error: ', err))
  }
}
