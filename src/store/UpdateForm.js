import { UPDATE_TITLE, UPDATE_BODY, UPDATE_SYNTAX, UPDATE_EMAIL, UPDATE_LAST_NAME, UPDATE_FIRST_NAME, UPDATE_JOB_TITLE, UPDATE_AVATAR, UPDATE_TOP_SKILLS, UPDATE_BIRTHDAY } from './type';

const defaultState = {
  updateTitle: "",
  updateBody: "",
  updateSyntax: "",
  email: "",
  firstName: "",
  lastName: "",
  jobTitle: "",
  avatar: "",
  topSkills: "",
  birthday: ""
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
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    case UPDATE_FIRST_NAME:
      return {
        ...state,
        firstName: action.payload
      }
    case UPDATE_LAST_NAME:
      return {
        ...state,
        lastName: action.payload
      }
    case UPDATE_JOB_TITLE:
      return {
        ...state,
        jobTitle: action.payload
      }
    case UPDATE_TOP_SKILLS:
        return {
          ...state,
          topSkills: action.payload
        }
    case UPDATE_AVATAR:
      return {
        ...state,
        avatar: action.payload
      }
    case UPDATE_BIRTHDAY:
      return {
        ...state,
        birthday: action.payload
      }
    default:
      return state
  }
}

export default store;