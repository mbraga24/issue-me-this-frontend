import { SET_LIKES } from './type'

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
    default: 
      return state
  }
}

export default store;