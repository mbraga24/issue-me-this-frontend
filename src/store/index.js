import { createStore, combineReducers } from 'redux';
import user from './User';
import term from './SearchTerm';
import issue from './Issue';
import comment from './Comment';
import likeIssue from './LikeIssue';
import likeComment from './LikeComment';
import skill from './Skill';
import updateForm from './UpdateForm';

const rootReducer = combineReducers({
  user,
  issue,
  term,
  comment,
  likeIssue,
  likeComment,
  skill,
  updateForm
})

const store = createStore(rootReducer)

export default store;