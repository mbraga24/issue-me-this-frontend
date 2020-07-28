import React, { useEffect } from 'react';
import '../SideBar.css';

const SideBar = (props) => {
  return (
    <div className={`ui vertical inverted overlay left animating sidebar menu ${props.toggleMenu ? 'visible' : 'hidden'}`}>
      <a href="#" className="item">All Issues<i className="large list alternate outline icon"></i></a>
      <a href="#" className="item">New Issue<i className="large pen square icon"></i></a>
      <a href="#" className="item">Profile<i className="large address card outline icon"></i></a>
    </div>
  );
}

export default SideBar;