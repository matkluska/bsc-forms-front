import conf from 'config'

export const SAVE_FORM_REQUEST = 'SAVE_FORM_REQUEST';
export const SAVE_FORM_SUCCESS = 'SAVE_FORM_SUCCESS';
export const SAVE_FORM_FAILURE = 'SAVE_FORM_FAILURE';

function requestSaveForm(form) {
  return {
    type: SAVE_FORM_REQUEST,
    isSaved: false,
    isFetching: true,
    form
  }
}

function receiveSaveForm() {
  return {
    type: SAVE_FORM_SUCCESS,
    isSaved: true,
    isFetching: false
  }
}

function saveFormError(message) {
  return {
    type: SAVE_FORM_FAILURE,
    isSaved: false,
    isFetching: false,
    message
  }
}

export function saveForm(form) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    body: JSON.stringify(form)
  };
  return dispatch => {
    dispatch(requestSaveForm(form));
    let url = `${conf.serverURL}form-service/forms`;
    return fetch(url, config)
      .then(response => {
          if (response.ok) {
            console.log('ok');
            dispatch(receiveSaveForm());
            // return Promise.resolve()
          } else {
            response.json().then(error => {
              console.log('error');
              dispatch(saveFormError(error.error_description));
              // return Promise.reject(error)
            })
          }
        }
      )
      .catch(err => console.error('Error: ', err))
  }
}
