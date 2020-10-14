import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { DELETE_COMMENT, UPDATE_ISSUE } from '../store/type';
import { Link } from 'react-router-dom';
import '../resources/Comment.css';

const Comment = props => {

  const dispatch = useDispatch()
  const handleDelete = commentId => {
    fetch(`http://localhost:3000/comments/${commentId}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(data => {
      console.log("DELETE COMMENT --->", data)
      dispatch({ type: DELETE_COMMENT, payload: data.comment })
      dispatch({ type: UPDATE_ISSUE, payload: data.issue })
    })
  }

  const { title, comment_body } = props.comment
  const { id, first_name, profession, avatar } = props.comment.user
  const imgUrl = `https://semantic-ui.com/images/avatar/small/${avatar}.jpg`

  return (
    <div className="ui comment">
      <div className="Comment-user-header">
        <Link to={`/users/${id}`} className="author Comment-user-info"> 
            {first_name} - {profession}
        </Link>
        <div className="metadata">
          {moment().startOf('day').fromNow()}
        </div>
      </div>
      <div className="avatar">
        <img src={imgUrl} alt={first_name} />
      </div>
      <div className="content">
        <div className="ui divider"></div>
          <h3>{title}</h3>
          <div className="text">{comment_body}</div>
          <div className="Comment-extra-content">
            { (props.currentUser && props.currentUser.id === id) &&
              <div className="row">
                <div>
                  <button className="ui circular icon red button" onClick={handleDelete}><i aria-hidden="true" className="trash alternate outline icon"></i></button>
                  <button className="ui circular icon blue button"><i aria-hidden="true" className="edit outline icon"></i></button>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="ui divider"></div>
      </div>
  )
}

export default Comment;