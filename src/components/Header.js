import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';

const Header = props => {

  const currentUser = useSelector(state => state.user.keyHolder)
  const richardQuotes = () => {
    const phrases = [
      "Yeah, it's minimalist, you know? Sharp, clean lines.",
      "I welcome you to Pied Piper's new home. Hoo-hoo-hoo!",
      "That whole spaces-tab thing was illustrative of our vast differences.",
      "I'm not hiring him. He uses spaces not tabs."
    ]
    const randomNum = Math.floor(Math.random() * phrases.length)
    return phrases[randomNum]
  }
  return(
    <div className="ui top inverted attached menu">
      <span className="item link grey" onClick={props.onToggleMenu}>Menu</span>
      <Link to="/home" className="item link grey">
        Home
      </Link>
      {currentUser &&
        <>
          <Link to={`/users/${currentUser.id}`} className="item link grey">
            Profile
          </Link>     
        </>
      }
      <Popup
        trigger={<span className="item link grey"><i className="big pied piper alternate icon"></i></span>}
        content={() => richardQuotes()}
        hideOnScroll
      />
      
    </div>
  );
} 

export default Header;