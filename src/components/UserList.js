import React from 'react';
import { Link } from 'react-router-dom';

const UserList = (props) => {

  const { id, name, age, profession, avatar } = props
  const imgUrl = `https://semantic-ui.com/images/avatar/large/${avatar}.jpg`

  return (
    <div className="ui card">
      <div className="image">
        <Link to={`/users/${id}`}>
          <img src={imgUrl} alt={name} className="ui image" />
        </Link>
      </div>
      <div className="content">
        <div className="header">
          <Link to={`/users/${id}`}>
            {name}
          </Link>
        </div>
        <div className="meta">Age: {age}</div>
        <div className="description">Profession: {profession}</div>
      </div>
      <div className="extra content">
        <a>
          <i aria-hidden="true" className="large pen square icon"></i>
          10 Issues
        </a>
      </div>
    </div>
  );
}

export default UserList;