import React from 'react';
import { Link } from 'react-router-dom';

const UserList = (props) => {

  const { id, username, age, profession, avatar, issues } = props
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
        <Link to={`/users/${id}`}>
          <i aria-hidden="true" className="large pen square icon"></i>
          { issues.length } { issues.length > 1 || issues.length === 0 ? "Issues" : "Issue" } 
        </Link>
      </div>
    </div>
  );
}

export default UserList;