import { SET_COMMENTS, ADD_COMMENT, DELETE_COMMENT } from './type';

const defaultState = {
  comments: []
}

// sort comments from greatest to least
const sortedComments = data => {
  return data.sort((a, b) => b.id - a.id)
} 

const store = (state = defaultState, action) => {
  // console.log("COMMENT STORE BEFORE ACTION -->", action.payload)
  switch(action.type) {
    case SET_COMMENTS:
      // console.log("COMMENT STORE -->", action.payload)
      return {
        ...state,
        comments: [...sortedComments(action.payload)]
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      }
    case DELETE_COMMENT:
      console.log("DELETE_COMMENT STORE -->", action.payload)
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