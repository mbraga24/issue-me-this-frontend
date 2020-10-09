import { SET_ISSUES, ADD_ISSUE, DELETE_ISSUE } from './type';

const defaultState = {
  issues: []
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_ISSUES:
      return {
        ...state,
        issues: [...action.payload]
      }
    case ADD_ISSUE:
      return {
        ...state,
        issues: [...state.issues, action.payload]
      }
    case DELETE_ISSUE:
      const filteredIssues = state.issues.filter(issue => issue.id !== action.payload.id)
      return {
        ...state,
        issues: [...filteredIssues]
      }
    default:
      return state
  }
}

export default store;