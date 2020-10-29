import { SET_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from './type';

const defaultState = {
  comments: []
}

// sort comments from greatest to least
const sortedComments = data => {
  return data.sort((a, b) => b.id - a.id)
} 

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: [...sortedComments(action.payload)]
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      }
    case UPDATE_COMMENT:
      const updateComments = state.comments.map(comment => comment.id !== action.payload.id ? comment : action.payload)
      return {
        ...state,
        comments: [...updateComments]
      }
    case DELETE_COMMENT:
      const filteredComments = state.comments.filter(comment => comment.id !== action.payload.id)
      return {
        ...state,
        comments: [...filteredComments]
      }
    default:
      return state
  }
}

export default store;