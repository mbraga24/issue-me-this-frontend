import { SET_ISSUE_INDEX, ADD_ISSUE_INDEX, UPDATE_ISSUE_INDEX, DELETE_ISSUE_INDEX, SET_ISSUES, ADD_ISSUE, UPDATE_ISSUE, DELETE_ISSUE, UPDATE_TITLE, UPDATE_BODY } from './type';

const defaultState = {
  issues: null,
  issuesIndex: null,
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
    case SET_ISSUE_INDEX:
      return {
        ...state,
        issuesIndex: action.payload
      }
    case ADD_ISSUE_INDEX:
      return {
        ...state,
        issuesIndex: { ...state.issuesIndex, issue_pages: [action.payload ,...state.issuesIndex.issue_pages] }
      }
    case UPDATE_ISSUE_INDEX:
      const updatedIssueIndex = state.issuesIndex.issue_pages.map(issue => issue.id === action.payload.id ? action.payload : issue)
      return {
        ...state,
        issuesIndex: { ...state.issuesIndex, issue_pages: [...updatedIssueIndex] }
      }
    case DELETE_ISSUE_INDEX:
      const remainingIssueIndex = state.issuesIndex.issue_pages.filter(issue => issue.id !== action.payload.id)
      return {
        ...state,
        issuesIndex: { ...state.issuesIndex, issue_pages: [...remainingIssueIndex] }
      }
    case ADD_ISSUE:
      return {
        ...state,
        issues: [ action.payload, ...state.issues ]
      }
    case UPDATE_ISSUE:
      const updatedIssues = state.issues.map(issue => issue.id !== action.payload.id ? issue : action.payload)
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