import conf from 'config'

export const DELETE_FORM_REQUEST = 'DELETE_FORM_REQUEST';
export const DELETE_FORM_SUCCESS = 'DELETE_FORM_SUCCESS';
export const DELETE_FORM_FAILURE = 'DELETE_FORM_FAILURE';

function requestDeleteForm(formId) {
  return {
    type: DELETE_FORM_REQUEST,
    isDeleted: false,
    isFetching: true,
    formId
  }
}

function receiveDeleteForm() {
  return {
    type: DELETE_FORM_SUCCESS,
    isDeleted: true,
    isFetching: false
  }
}

function deleteFormError(message) {
  return {
    type: DELETE_FORM_FAILURE,
    isDeleted: false,
    isFetching: false,
    message
  }
}

export function deleteForm(formId) {
  let config = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  };
  return dispatch => {
    dispatch(requestDeleteForm(formId));
    let url = `${conf.serverURL}form-service/forms/${formId}`;
    return fetch(url, config)
      .then(response => {
          if (response.ok) {
            console.log('ok');
            dispatch(receiveDeleteForm());
          } else {
            response.json().then(error => {
              console.log('error');
              dispatch(deleteFormError(error.error_description));
            })
          }
        }
      )
      .catch(err => console.error('Error: ', err))
  }
}
