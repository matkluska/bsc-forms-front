import conf from 'config'

export const ADD_REPLY_REQUEST = 'ADD_REPLY_REQUEST';
export const ADD_REPLY_SUCCESS = 'ADD_REPLY_SUCCESS';
export const ADD_REPLY_FAILURE = 'ADD_REPLY_FAILURE';

function requestAddReply(reply, formId) {
  return {
    type: ADD_REPLY_REQUEST,
    isAdded: false,
    isFetching: true,
    reply,
    formId
  }
}

function receiveAddReply() {
  return {
    type: ADD_REPLY_SUCCESS,
    isAdded: true,
    isFetching: false
  }
}

function addReplyError(message) {
  return {
    type: ADD_REPLY_FAILURE,
    isAdded: false,
    isFetching: false,
    message
  }
}

export function addReply(reply, formId) {
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(reply)
  };
  return dispatch => {
    dispatch(requestAddReply(reply, formId));
    let url = `${conf.serverURL}reply-stats-service/replies/${formId}`;
    return fetch(url, config)
      .then(response => {
          if (response.ok) {
            console.log('ok');
            dispatch(receiveAddReply());
          } else {
            response.json().then(error => {
              console.log('error');
              dispatch(addReplyError(error.error_description));
            })
          }
        }
      )
      .catch(err => console.error('Error: ', err))
  }
}
