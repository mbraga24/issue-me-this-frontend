import { SET_USERS, ADD_USER, UPDATE_USER, SET_KEY_HOLDER } from './type';

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