import { createStore, combineReducers } from 'redux';
import user from './User';
import term from './SearchTerm';
import issue from './Issue';

const rootReducer = combineReducers({
  user,
  issue,
  term
})

const store = createStore(rootReducer)

export default store;