import conf from 'config'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(credentials) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    credentials
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    access_token: user.access_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

function requestRegister(credentials) {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    credentials
  }
}

function receiveRegister() {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false
  }
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    message
  }
}

export function loginUser(credentials) {
  let config = {
    method: 'POST'
  };

  return dispatch => {
    dispatch(requestLogin(credentials));
    let url = `${conf.serverURL}auth-service/uaa/oauth/token?username=${credentials.username}` +
      `&password=${credentials.password}&grant_type=password&client_id=browser&scope=ui`;
    return fetch(url, config)
      .then(response =>
        response.json()
          .then(user => ({user, response}))
      ).then(({user, response}) => {
        if (!response.ok) {
          dispatch(loginError(user.error_description));
          return Promise.reject(user)
        }
        else {
          localStorage.setItem('access_token', user.access_token);

          dispatch(receiveLogin(user));
        }
      }).catch(err => console.log('Error: ', err))
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('access_token');
    dispatch(receiveLogout())
  }
}

export function registerUser(credentials) {
  let config = {
    method: 'POST',
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
      .then(response =>
        response.json()
          .then(data => ({data, response}))
      ).then(({data, response}) => {
        if (!response.ok) {
          dispatch(registerError(data.error_description));
          return Promise.reject(data)
        }
        else {
          dispatch(receiveRegister());
        }
      }).catch(err => console.log('Error: ', err))
  }
}
