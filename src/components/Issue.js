import React from 'react';
import { Link } from 'react-router-dom';

const Issue = (props) => {

  const issueId = props.issue.id
  const user_name = props.user.name
  const total_comments = props.comment.length
  const img_url = `https://semantic-ui.com/images/avatar/small/${props.user.avatar}.jpg`
  const { title, issue_body } = props.issue

  const handleDeleteButton = () => {
    fetch(`http://localhost:3000/issues/${issueId}`, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(data => {
        // console.log(data, `issueId: ${issueId}`)
        props.handleDelete(issueId)
      })
  }

  return (
    <div class="ui celled grid">
      <div class="row">
        <div class="sixteen wide column ui card">
          <div className="content">
            <div className="header">
              <Link to={`/issues/${issueId}`}>
                {title}
                <img src={img_url} alt={user_name} className="ui mini right floated image" />
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
              {total_comments} Comments
            </Link>
          </div>
        </div>
        <div class="row">
          <div class="five wide column">
            <div class="ui buttons" style={{ padding: "10px" }}>
              <button class="ui red button" onClick={handleDeleteButton}>Delete</button>
              <button class="ui olive button">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Issue;