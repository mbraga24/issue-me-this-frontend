import { SET_ISSUE_LIKES, ADD_ISSUE_LIKE, DELETE_ISSUE_LIKE } from './type';

const defaultState = {
  issueLikes: []
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_ISSUE_LIKES:
      return {
        ...state,
        issueLikes: [...action.payload]
      }
    case ADD_ISSUE_LIKE:
      return {
        ...state,
        issueLikes: [action.payload, ...state.issueLikes]
      }
    case DELETE_ISSUE_LIKE:
      const filteredIssueLikes = state.issueLikes.filter(like => like.id !== action.payload.id)
      return {
        ...state,
        issueLikes: [...filteredIssueLikes]
      }
    default:
      return state
  }
}

export default store;