import React from 'react';
import { Link } from 'react-router-dom';
import '../Issue.css';

const Issue = (props) => {

  const issueId = props.issue.id
  const username = props.user.username
  const totalComments = props.comment.length
  const imgUrl = `https://semantic-ui.com/images/avatar/small/${props.user.avatar}.jpg`
  const { title, issue_body } = props.issue

  return (
    <div className="ui celled grid">
      <div className="row">
        <div className="sixteen wide column ui card">
          <div className="content">
            <div className="header">
              <Link to={`/issues/${issueId}`}>
                {title}
                <img src={imgUrl} alt={username} className="ui circular mini right floated image" />
              </Link>
            </div>
          </div>
          <div className="content">
            <div className="description">
              {issue_body}
            </div>
          </div>
          <div className="extra content">
            <Link to={`/issues/${issueId}`}>
              <i aria-hidden="true" className="comment alternate icon"></i>
              {totalComments} Comments
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="five wide column">
            <div className="Issue-buttons">
              <button className="ui button">Delete</button>
              <button className="ui button">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Issue;