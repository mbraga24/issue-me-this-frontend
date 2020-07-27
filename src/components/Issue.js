import React from 'react';

const Issue = (props) => {
  
    const user_name = props.user.name
    const user_avatar = props.user.avatar
    const total_comments = props.comment.length
    const { title, issue_body } = props.issue

    return (
      <div className="ui card fluid">
        <div className="content"><div className="header">{title}</div>
          <img src={user_avatar} alt={user_name} className="ui mini right floated image" />
        </div>
        <div className="content">
          <div className="description">
            {issue_body}
          </div>
        </div>
        <div className="extra content">
          <i aria-hidden="true" className="user icon"></i>
          {total_comments} Comments
        </div>
      </div>

    );
}

export default Issue;