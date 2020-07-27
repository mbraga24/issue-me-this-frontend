import React, { useEffect } from 'react';
import '../SideBar.css';

const SideBar = (props) => {
  return (
    <div className={`ui vertical inverted overlay left animating sidebar menu ${props.toggleMenu ? 'visible' : 'hidden'}`}>
      <a href="#" className="item">Home</a>
      <a href="#" className="item">Games</a>
      <a href="#" className="item">Channels</a>
    </div>
  );
}

export default SideBar;