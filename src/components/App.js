import React, { useEffect } from 'react';
import  { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SET_USERS, SET_ISSUES, SET_ISSUE_INDEX, SET_KEY_HOLDER, SET_COMMENTS, SET_SKILLS, SET_ISSUE_LIKES, SET_COMMENT_LIKES } from '../store/type';
import AppWrapper from './AppWrapper';
import '../resources/App.css';

const App = props => {
  const dispatch = useDispatch()

  useEffect(() => {

    // autologin
   if (localStorage.token) {
    fetch("http://localhost:3000/api/v1/autologin/", {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(r => r.json())
    .then(user => {
      dispatch({ type: SET_KEY_HOLDER, payload: user })
    })
   }

    // fetch users
    fetch("http://localhost:3000/api/v1/users/")
    .then(r => r.json())
    .then(users => {
      // set users in the store
      dispatch({ type: SET_USERS, payload: users })
    })

    // fetch issues
    fetch("http://localhost:3000/api/v1/issues/")
    .then(r => r.json())
    .then(issuesIndex => {
      const { issue_pages, page, pages } = issuesIndex

      dispatch({ type: SET_ISSUE_INDEX, payload: { issue_pages, page, pages } })
      dispatch({ type: SET_ISSUES, payload: issuesIndex.issues })
    })

    // fetch comments
    fetch("http://localhost:3000/api/v1/comments/")
    .then(r => r.json())
    .then(comments => {
      dispatch({ type: SET_COMMENTS, payload: comments })
    })

    // fetch like_issues
    fetch("http://localhost:3000/api/v1/like_issues/")
    .then(r => r.json())
    .then(likes => {
      dispatch({ type: SET_ISSUE_LIKES, payload: likes })
    })

      // fetch like_comments
      fetch("http://localhost:3000/api/v1/like_comments/")
      .then(r => r.json())
      .then(likes => {
        dispatch({ type: SET_COMMENT_LIKES, payload: likes })
      })

    // fetch skills
    fetch("http://localhost:3000/api/v1/skills/")
    .then(r => r.json())
    .then(skills => {
      dispatch({ type: SET_SKILLS, payload: skills })
    })
    
  }, [dispatch])

  return ( <div id="App-Container"><AppWrapper /></div> );
}

export default withRouter(App);

