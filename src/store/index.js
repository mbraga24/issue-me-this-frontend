import { createStore, combineReducers } from 'redux';
import user from './User';
import term from './SearchTerm';
import issue from './Issue';
import comment from './Comment';
import skill from './Skill';
import like from './Like';

const rootReducer = combineReducers({
  user,
  issue,
  term,
  comment,
  skill,
  like
})

const store = createStore(rootReducer)

export default store;