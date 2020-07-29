import React from 'react';

const Comment = (props) => {

  const { title, comment_body } = props.comment
  const { name, profession, avatar } = props.user
  const imgUrl = `https://semantic-ui.com/images/avatar/small/${avatar}.jpg`

  return (
    <div className="comment">
      <div className="avatar"><img src={imgUrl} alt={name} /></div>
      <div className="content">
        <a className="author">{name} - {profession}</a>
        <h3>{title}</h3>
        <div className="metadata"><div>5 days ago</div></div>
        <div className="text">{comment_body}</div>
        <div className="actions"><a className="">Reply</a></div>
      </div>
    </div>
  )
}

export default Comment;