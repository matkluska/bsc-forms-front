import conf from 'config'

export const GET_FORM_REQUEST = 'GET_FORM_REQUEST';
export const GET_FORM_SUCCESS = 'GET_FORM_SUCCESS';
export const GET_FORM_NOT_FOUND = 'GET_FORM_NOT_FOUND';
export const GET_FORM_FAILURE = 'GET_FORM_FAILURE';

function requestGetForm(formId) {
  return {
    type: GET_FORM_REQUEST,
    isFound: false,
    isNotFound: false,
    isFetching: true,
    formId
  }
}

function receiveGetForm(form) {
  return {
    type: GET_FORM_SUCCESS,
    isFound: true,
    isNotFound: false,
    isFetching: false,
    form
  }
}

function receiveNotFoundForm(formId) {
  return {
    type: GET_FORM_NOT_FOUND,
    isFound: false,
    isNotFound: true,
    isFetching: false,
    formId
  }
}

function getFormError(message) {
  return {
    type: GET_FORM_FAILURE,
    isFound: false,
    isNotFound: false,
    isFetching: false,
    message
  }
}

export function getForm(formId) {
  let config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };
  return dispatch => {
    dispatch(requestGetForm(formId));
    let url = `${conf.serverURL}form-service/forms/${formId}`;
    return fetch(url, config)
      .then(response => {
          if (response.ok) {
            console.log('ok');
            response.json().then(form => {
              dispatch(receiveGetForm(form));
            })
          } else if (response.status === 404) {
            console.log('not found');
            dispatch(receiveNotFoundForm(formId))
          } else {
            response.json().then(error => {
              console.log('error');
              dispatch(getFormError(error.error_description));
            })
          }
        }
      )
      .catch(err => console.error('Error: ', err))
  }
}
