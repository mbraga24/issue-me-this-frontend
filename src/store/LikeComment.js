import { SET_COMMENT_LIKES, ADD_COMMENT_LIKE, DELETE_COMMENT_LIKE } from './type';

const defaultState = {
  commentLikes: []
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_COMMENT_LIKES:
      return {
        ...state,
        commentLikes: [...action.payload]
      }
    case ADD_COMMENT_LIKE:
      return {
        ...state,
        commentLikes: [action.payload, ...state.commentLikes]
      }
    case DELETE_COMMENT_LIKE:
      const filteredCommentLikes = state.commentLikes.filter(like => like.id !== action.payload.id)
      return {
        ...state,
        commentLikes: [...filteredCommentLikes]
      }
    default:
      return state
  }
}

export default store;