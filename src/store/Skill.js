import { SET_SKILLS } from './type'

const defaultState = {
  skills: []
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_SKILLS:
      return {
        ...state,
        skills: [...action.payload]
      }
    default: 
      return state
  }
}

export default store;