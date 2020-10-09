import { SET_USERS, ADD_USER, SET_KEY_HOLDER } from './type';

const defaultState = {
  keyHolder: null,
  users: []
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
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      }
    default: 
      return state
  }
}

export default reducer;