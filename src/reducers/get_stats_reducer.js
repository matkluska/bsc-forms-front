import {GET_STATS_FAILURE, GET_STATS_NOT_FOUND, GET_STATS_REQUEST, GET_STATS_SUCCESS} from 'actions/get_stats_action'

function getStats(state = {
  isFetching: false,
  isFound: false,
  isNotFound: false
}, action) {
  switch (action.type) {
    case GET_STATS_REQUEST:
      return {
        ...state,
        isFound: false,
        isNotFound: false,
        isFetching: true,
        formId: action.formId
      };
    case GET_STATS_SUCCESS:
      return {
        ...state,
        isFound: true,
        isNotFound: false,
        isFetching: false,
        stats: action.stats
      };
    case GET_STATS_NOT_FOUND:
      return {
        ...state,
        isFound: false,
        isNotFound: true,
        isFetching: false,
        formId: action.formId
      };
    case GET_STATS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFound: false,
        isNotFound: false,
        errorMessage: action.message
      };

    default:
      return state
  }
}

export default getStats
