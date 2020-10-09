import { createStore, combineReducers } from 'Redux';
import user from './User';

const rootReducer = combineReducers({
  user
})

const store = createStore(rootReducer)

export default store;