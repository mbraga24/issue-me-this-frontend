import { SET_SEARCH_TERM } from './type';

const defaultState = {
  searchTerm: ""
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case SET_SEARCH_TERM: 
    return {
      searchTerm: action.payload
    }
    default:
      return state
  }
}

export default store;