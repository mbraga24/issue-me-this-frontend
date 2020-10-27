import { SET_LIKES, UPDATE_LIKES } from './type'

const defaultState = {
  likes: []
}


const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_LIKES:
      console.log("SET LIKES -->", action.payload)
      return {
        ...state,
        likes: [...action.payload]
      }
      case UPDATE_LIKES:
        const updatedLikes = state.likes.filter(like => like.id !== action.payload.id)
        console.log("UPDATE LIKES -->", updatedLikes)
      return {
        ...state,
        likes: [...updatedLikes]
      }
    default: 
      return state
  }
}

export default store;