import { UPDATE_TITLE, UPDATE_BODY, UPDATE_SYNTAX } from './type';

const defaultState = {
  updateTitle: "",
  updateBody: "",
  updateSyntax: ""
}

const store = (state = defaultState, action) => {
  switch(action.type) {
    case UPDATE_TITLE:
      return {
        ...state,
        updateTitle: action.payload
      }
    case UPDATE_BODY:
      return {
        ...state,
        updateBody: action.payload
      }
    case UPDATE_SYNTAX:
      return {
        ...state,
        updateSyntax: action.payload
      }
    default:
      return state
  }
}

export default store;