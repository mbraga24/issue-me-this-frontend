import { SET_USERS, ADD_USER, UPDATE_USER, SET_KEY_HOLDER, REMOVE_KEY_HOLDER_LIKE, ADD_KEY_HOLDER_LIKE } from './type';

const defaultState = {
  keyHolder: null,
  users: []
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_USERS:
      // console.log("USER STORE -->", action.payload)
      return {
        ...state,
        users: [...action.payload]
      }
    case SET_KEY_HOLDER:
      return {
        ...state,
        keyHolder: action.payload
      }
    case REMOVE_KEY_HOLDER_LIKE:
      const likeIssuesRemove = state.keyHolder.like_issues.filter(like => like.id !== action.payload.id)
      console.log("REMOVE KEY HOLDER LIKE -->", likeIssuesRemove)
      return {
        ...state,
        keyHolder: { ...state.keyHolder, like_issues: likeIssuesRemove }
      }
    case ADD_KEY_HOLDER_LIKE:
      const currentLikeIssues = state.keyHolder.like_issues
      // console.log("ADD LIKE USER STORE -->", currentLikeIssues, action.payload)
      const newArray = [...currentLikeIssues, action.payload] 
      console.log("ADD KEY HOLDER LIKE -->", newArray)
      return {
        ...state,
        keyHolder: { ...state.keyHolder, like_issues: newArray }
      }
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    case UPDATE_USER:
      const updatedUser = state.users.map(user => user.id !== action.payload.id ? user : action.payload)
      return {
        ...state,
        users: [...updatedUser]
      }
    default: 
      return state
  }
}

export default reducer;