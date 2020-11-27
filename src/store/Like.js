import { SET_LIKES, ADD_LIKE, UPDATE_LIKE, DELETE_LIKE } from './type';

const defaultState = {
  likes: []
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_LIKES:
      return {
        ...state,
        likes: [...action.payload]
      }
    case ADD_LIKE:
      return {
        ...state,
        likes: [action.payload, ...state.likes]
      }
    case UPDATE_LIKE:
      const updateLikes = state.likes.map(like => like.id !== action.payload.id ? like : action.payload)
      return {
        ...state,
        likes: [...updateLikes]
      }
    case DELETE_LIKE:
      const filteredLikes = state.likes.filter(like => like.id !== action.payload.id)
      return {
        ...state,
        likes: [...filteredLikes]
      }
    default:
      return state
  }
}

export default store;