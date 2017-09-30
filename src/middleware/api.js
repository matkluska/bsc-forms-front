import conf from 'config';

const BASE_URL = conf.serverURL;

function callApi(endpoint, authenticated) {

  let token = localStorage.getItem('access_token') || null;
  let config = {};

  if (authenticated) {
    if (token) {
      config = {
        headers: {'Authorization': `Bearer ${token}`}
      }
    } else {
      throw 'No token saved!'
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.text()
        .then(text => ({text, response}))
    ).then(({text, response}) => {
      if (!response.ok) {
        return Promise.reject(text)
      }

      return text
    }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API');

export default () => next => action => {

  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let {endpoint, types, authenticated} = callAPI;

  const [successType, errorType] = types;

  return callApi(endpoint, authenticated).then(
    response =>
      next({
        response,
        authenticated,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}
