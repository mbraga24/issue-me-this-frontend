import React from 'react';
import { Link } from 'react-router-dom';
import '../Comment.css';

const Comment = (props) => {

  const { title, comment_body } = props.comment
  const { id, username, profession, avatar } = props.user
  const imgUrl = `https://semantic-ui.com/images/avatar/small/${avatar}.jpg`
  
  return (
    <div className="ui comment Comment-container">
      <div className="avatar"><img src={imgUrl} alt={username} /></div>
      <div className="content">
        <Link to={`/users/${id}`} className="author">
          {username} - {profession}
        </Link>
        <h3>{title}</h3>
        <div className="text">{comment_body}</div>
        <div className="metadata"><div>5 days ago</div></div>
      </div>
    </div>
  )
}

export default Comment;