import React, { useEffect } from 'react';
import  { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SET_USERS, SET_ISSUES, SET_ISSUE_INDEX, SET_KEY_HOLDER, SET_COMMENTS, SET_SKILLS, SET_LIKES } from '../store/type';
import AppWrapper from './AppWrapper';
import '../resources/App.css';
// import { Container } from 'semantic-ui-react';

const App = props => {
  const dispatch = useDispatch()

  useEffect(() => {
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
    .then(issuesIndex => {
      // set issues in the store
      const { issue_pages, page, pages } = issuesIndex

      dispatch({ type: SET_ISSUE_INDEX, payload: { issue_pages, page, pages } })
      dispatch({ type: SET_ISSUES, payload: issuesIndex.issues })
    })

    // fetch comments
    fetch("http://localhost:3000/comments")
    .then(r => r.json())
    .then(comments => {
      // set comments in the store
      dispatch({ type: SET_COMMENTS, payload: comments })
    })

    // fetch likes
    fetch("http://localhost:3000/like_issues")
    .then(r => r.json())
    .then(likes => {
      console.log("ALL LIKES -->", likes)
      // set likes in the store
      dispatch({ type: SET_LIKES, payload: likes })
    })

    // fetch skills
    fetch("http://localhost:3000/skills")
    .then(r => r.json())
    .then(skills => {
      // set skills in the store
      dispatch({ type: SET_SKILLS, payload: skills })
    })

  }, [dispatch])

  return ( <div id="App-Container"><AppWrapper /></div> );
}

export default withRouter(App);

