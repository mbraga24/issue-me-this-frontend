import { SET_USERS, ADD_USER, UPDATE_USER, SET_KEY_HOLDER, REMOVE_KEY_HOLDER_LIKE, ADD_KEY_HOLDER_LIKE, ADD_KEY_HOLDER_FAVORITE, REMOVE_KEY_HOLDER_FAVORITE } from './type';

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
    case ADD_KEY_HOLDER_LIKE:
      const currentLikeIssues = state.keyHolder.like_issues
      const newLikes = [...currentLikeIssues, action.payload] 
      return {
        ...state,
        keyHolder: { ...state.keyHolder, like_issues: newLikes }
      }
    case REMOVE_KEY_HOLDER_LIKE:
      const remainingIssueLikes = state.keyHolder.like_issues.filter(like => like.id !== action.payload.id)
      return {
        ...state,
        keyHolder: { ...state.keyHolder, like_issues: remainingIssueLikes }
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