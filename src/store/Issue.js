import { SET_ISSUES, ADD_ISSUE, DELETE_ISSUE } from './type';

const defaultState = {
  issues: []
}

// sort issues from greatest to least
const sortedIssues = (data) => {
  return data.sort((a, b) => b.id - a.id)
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_ISSUES:
      return {
        ...state,
        issues: [...sortedIssues(action.payload)]
      }
    case ADD_ISSUE:
      return {
        ...state,
        issues: [action.payload,...state.issues]
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