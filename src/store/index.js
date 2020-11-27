import { createStore, combineReducers } from 'redux';
import user from './User';
import term from './SearchTerm';
import issue from './Issue';
import comment from './Comment';
import like from './Like';
import skill from './Skill';
import updateForm from './UpdateForm';

const rootReducer = combineReducers({
  user,
  issue,
  term,
  comment,
  like,
  skill,
  updateForm
})

const store = createStore(rootReducer)

export default store;