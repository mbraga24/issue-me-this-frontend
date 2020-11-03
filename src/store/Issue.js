import { SET_ISSUES, ADD_ISSUE, UPDATE_ISSUE, DELETE_ISSUE, UPDATE_TITLE, UPDATE_BODY } from './type';

const defaultState = {
  issues: null,
  issueTitle: "",
  issueBody: ""
}

const sortedIssues = data => {
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
    case UPDATE_ISSUE:
      console.log("UPDATE ISSUE --->", action.payload)
      const updatedIssues = state.issues.map(issue => issue.id !== action.payload.id ? issue : action.payload)
      // console.log("UPDATEDISSUES --->", updatedIssues)
      return {
        ...state,
        issues: [...updatedIssues]
      }
    case DELETE_ISSUE:
      const filteredIssues = state.issues.filter(issue => issue.id !== action.payload.id)
      return {
        ...state,
        issues: [...filteredIssues]
      }
    case UPDATE_TITLE:
      return {
        ...state,
        issueTitle: action.payload
      }
    case UPDATE_BODY:
      return {
        ...state,
        issueBody: action.payload
      }
    default:
      return state
  }
}

export default store;