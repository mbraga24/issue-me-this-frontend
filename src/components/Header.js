import React from 'react';

const Header = (props) => {

  return(
    <div className="ui top inverted attached menu">
      <span className="item link grey" onClick={props.onToggleMenu}>Menu</span>
    </div>
  );
} 

export default Header;