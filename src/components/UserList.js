import React from 'react';
import { Link } from 'react-router-dom';

const UserList = (props) => {

  const { id, username, age, profession, avatar } = props
  const imgUrl = `https://semantic-ui.com/images/avatar/large/${avatar}.jpg`

  return (
    <div className="ui card">
      <div className="image">
        <Link to={`/users/${id}`}>
          <img src={imgUrl} alt={username} className="ui image" />
        </Link>
      </div>
      <div className="content">
        <div className="header">
          <Link to={`/users/${id}`}>
            {username}
          </Link>
        </div>
        <div className="meta">Age: {age}</div>
        <div className="description">Profession: {profession}</div>
      </div>
      <div className="extra content">
        <Link to="/pages">
          <i aria-hidden="true" className="large pen square icon"></i>
          10 Issues
        </Link>
      </div>
    </div>
  );
}

export default UserList;