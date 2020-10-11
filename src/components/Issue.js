import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DELETE_ISSUE } from '../store/type';
import '../resources/Issue.css';

const Issue = props => {
  
  const dispatch = useDispatch() 
  const currentUser = useSelector(state => state.user.keyHolder)
  const { id, title, issue_body, comments, user } = props.issue
  const totalComments = comments.length
  const imgUrl = `https://semantic-ui.com/images/avatar/small/${user.avatar}.jpg`

  const handleDelete = (issueId) => {
    fetch(`http://localhost:3000/issues/${issueId}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(issue => {
      dispatch({ type: DELETE_ISSUE, payload: issue })
    })
  }

  return (
    <div className="ui celled grid">
      <div className="row">
        <div className="sixteen wide column ui card">
          <div className="content">
            <div className="header">
              <Link to={`/issues/${id}`} className="Issue-header">
                {title}
                <div className="Issue-user-subheader">
                  <span className="layer1"><img src={imgUrl} alt={user.first_name} className="ui circular mini right floated image" /></span>
                  <span className="layer2">{user.first_name}</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="content">
            <div className="description">
              {issue_body}
            </div>
          </div>
          <div className="Issue-extra-content">
            <Link to={`/issues/${id}`}>
              <i aria-hidden="true" className="comment alternate icon"></i>
              {totalComments} Comments
            </Link>
            { 
              ( currentUser && currentUser.id === user.id ) &&
              <div className="Issue-buttons">
                <button className="ui circular icon red button" onClick={() => handleDelete(id)}><i aria-hidden="true" className="trash alternate outline icon"></i></button>
                <button className="ui circular icon blue button"><i aria-hidden="true" className="edit outline icon"></i></button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Issue;