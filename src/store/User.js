const defaultState = {
  users: []
}

const reducer = () => {
  switch(action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...action.payload]
      }
    default: 
      return state
  }
}

export default reducer;