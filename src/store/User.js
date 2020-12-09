import { SET_USERS, ADD_USER, UPDATE_USER, SET_KEY_HOLDER, REMOVE_KEY_HOLDER_ISSUE_LIKE, ADD_KEY_HOLDER_ISSUE_LIKE, ADD_KEY_HOLDER_COMMENT_LIKE, REMOVE_KEY_HOLDER_COMMENT_LIKE, ADD_KEY_HOLDER_FAVORITE, REMOVE_KEY_HOLDER_FAVORITE } from './type';

const defaultState = {
  keyHolder: null,
  popularIssues: [],
  users: [],
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...action.payload]
      }
    case SET_KEY_HOLDER:
      return {
        ...state,
        keyHolder: action.payload
      }
    case ADD_KEY_HOLDER_ISSUE_LIKE:
      const currentLikeIssues = state.keyHolder.like_issues
      const newLikes = [...currentLikeIssues, action.payload] 
      return {
        ...state,
        keyHolder: { ...state.keyHolder, like_issues: newLikes }
      }
    case REMOVE_KEY_HOLDER_ISSUE_LIKE:
      const remainingIssueLikes = state.keyHolder.like_issues.filter(like => like.id !== action.payload.id)
      return {
        ...state,
        keyHolder: { ...state.keyHolder, like_issues: remainingIssueLikes }
      }
    case ADD_KEY_HOLDER_COMMENT_LIKE:
      const currentLikeComments = state.keyHolder.like_comments
      const newCommentLikes = [...currentLikeComments, action.payload] 
      return {
        ...state,
        keyHolder: { ...state.keyHolder, like_comments: newCommentLikes }
      }
    case REMOVE_KEY_HOLDER_COMMENT_LIKE:
      const remainingCommentLikes = state.keyHolder.like_comments.filter(like => like.id !== action.payload.id)
      return {
        ...state,
        keyHolder: { ...state.keyHolder, like_comments: [...remainingCommentLikes] }
      }
    case ADD_KEY_HOLDER_FAVORITE:
      const currentFavorites = state.keyHolder.favorites
      const newFavorites = [...currentFavorites, action.payload] 
      return {
        ...state,
        keyHolder: { ...state.keyHolder, favorites: newFavorites }
      }
      case REMOVE_KEY_HOLDER_FAVORITE:
      const remainingFavorites = state.keyHolder.favorites.filter(like => like.id !== action.payload.id)
      return {
        ...state,
        keyHolder: { ...state.keyHolder, favorites: remainingFavorites }
      }
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    case UPDATE_USER:
      const updatedUsers = state.users.map(user => user.id === action.payload.id ? action.payload : user )
      return {
        ...state,
        users: [...updatedUsers]
      }
    default: 
      return state
  }
}

export default reducer;