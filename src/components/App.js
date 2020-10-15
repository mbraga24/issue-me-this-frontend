import React, { useEffect } from 'react';
import  { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SET_USERS, SET_ISSUES, SET_KEY_HOLDER, SET_COMMENTS, SET_SKILLS } from '../store/type';
import SideBar from './SideBar';
import '../resources/App.css';

const App = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    // log user in when component mounts
    // check if user is loggedin with the id stored in localStorage
    // Additional metadata - authorization header convention
   if (localStorage.token) {
    fetch("http://localhost:3000/autologin", {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(r => r.json())
    .then(user => {
      // set current user in store
      dispatch({ type: SET_KEY_HOLDER, payload: user })
    })
   }

    // fetch users
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then(users => {
      // set users in the store
      dispatch({ type: SET_USERS, payload: users })
    })

    // fetch issues
    fetch("http://localhost:3000/issues")
    .then(r => r.json())
    .then(issues => {
      // set issues in the store
      dispatch({ type: SET_ISSUES, payload: issues })
    })

    // fetch comments
    fetch("http://localhost:3000/comments")
    .then(r => r.json())
    .then(comments => {
      // console.log("COMMENT AFTER FETCH -->", comments)
      // set comments in the store
      dispatch({ type: SET_COMMENTS, payload: comments })
    })

    // fetch skills
    fetch("http://localhost:3000/skills")
    .then(r => r.json())
    .then(skills => {
      // set skills in the store
      dispatch({ type: SET_SKILLS, payload: skills })
    })

  }, [dispatch])

  return (
    <div>
      <SideBar />
    </div>
  );
}

export default withRouter(App);

