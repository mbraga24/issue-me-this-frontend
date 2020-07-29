import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../SideBar.css';

const SideBar = (props) => {
  return (
    <div className={`ui vertical inverted overlay left animating sidebar menu ${props.toggleMenu ? 'visible' : 'hidden'}`}>
      <Link to="/issues" className="item">
        Issues
        <i className="large list alternate outline icon"></i>
      </Link>
      <Link to="/issues/new" className="item">
        New Issue
        <i className="large pen square icon"></i>
      </Link>
      <Link to="/users" className="item">
        Users
        <i className="large users icon"></i>
      </Link>
      <Link to="/users/id" className="item">
        Profile
        <i className="large user circle outline icon"></i>
      </Link>
    </div>
  );
}

export default SideBar;