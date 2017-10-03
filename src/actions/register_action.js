import conf from 'config'

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

function requestRegister(credentials) {
  return {
    type: REGISTER_REQUEST,
    isRegistered: false,
    isFetching: true,
    credentials
  }
}

function receiveRegister() {
  return {
    type: REGISTER_SUCCESS,
    isRegistered: true,
    isFetching: false
  }
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isRegistered: false,
    isFetching: false,
    message
  }
}

export function registerUser(credentials) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
      email: credentials.email
    })
  };
  return dispatch => {
    dispatch(requestRegister(credentials));
    let url = `${conf.serverURL}auth-service/uaa/users`;
    return fetch(url, config)
      .then(response => {
          if (response.ok) {
            console.log('ok');
            dispatch(receiveRegister());
            // return Promise.resolve()
          } else {
            response.json().then(error => {
              console.log('error');
              dispatch(registerError(error.error_description));
              // return Promise.reject(error)
            })
          }
        }
      )
      .catch(err => console.error('Error: ', err))
  }
}
