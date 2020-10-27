import { SET_LIKES, ADD_LIKE, REMOVE_LIKE } from './type'

const defaultState = {
  likes: []
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_LIKES:
      // console.log("SET LIKES -->", action.payload)
      return {
        ...state,
        likes: [...action.payload]
      }
      case REMOVE_LIKE:
        const remainingLikes = state.likes.filter(like => like.id !== action.payload.id)
        // console.log("UPDATE LIKES -->", remainingLikes)
      return {
        ...state,
        likes: [...remainingLikes]
      }
      case ADD_LIKE:
        // console.log("STORE ADD LIKE -->", action.payload)
      return {
        ...state,
        likes: [ action.payload, ...state.likes ]
      }
    default: 
      return state
  }
}

export default store;