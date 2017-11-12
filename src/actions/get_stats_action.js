import conf from 'config'

export const GET_STATS_REQUEST = 'GET_STATS_REQUEST';
export const GET_STATS_SUCCESS = 'GET_STATS_SUCCESS';
export const GET_STATS_NOT_FOUND = 'GET_STATS_NOT_FOUND';
export const GET_STATS_FAILURE = 'GET_STATS_FAILURE';

function requestGetStats(formId) {
  return {
    type: GET_STATS_REQUEST,
    isFound: false,
    isNotFound: false,
    isFetching: true,
    formId
  }
}

function receiveGetStats(stats) {
  return {
    type: GET_STATS_SUCCESS,
    isFound: true,
    isNotFound: false,
    isFetching: false,
    stats
  }
}

function receiveNotFoundForm(formId) {
  return {
    type: GET_STATS_NOT_FOUND,
    isFound: false,
    isNotFound: true,
    isFetching: false,
    formId
  }
}

function getStatsError(message) {
  return {
    type: GET_STATS_FAILURE,
    isFound: false,
    isNotFound: false,
    isFetching: false,
    message
  }
}

export function getStats(formId) {
  let config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  };
  return dispatch => {
    dispatch(requestGetStats(formId));
    let url = `${conf.serverURL}reply-stats-service/stats/${formId}`;
    return fetch(url, config)
      .then(response => {
          if (response.ok) {
            console.log('ok');
            response.json().then(form => {
              dispatch(receiveGetStats(form));
            })
          } else if (response.status === 404) {
            console.log('not found');
            dispatch(receiveNotFoundForm(formId))
          } else {
            response.json().then(error => {
              console.log('error');
              dispatch(getStatsError(error.error_description));
            })
          }
        }
      )
      .catch(err => console.error('Error: ', err))
  }
}
