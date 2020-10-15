import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Popup, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../resources/TopMenu.css';

const Header = props => {

  const currentUser = useSelector(state => state.user.keyHolder)
  const [ activeItem, setActiveItem ] = useState("home")
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
  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  return(
    <Menu color="teal" inverted id="Top-Menu-Bar">
      <Menu.Item
        active={activeItem === 'more'}
        onClick={props.onToggleMenu}
      >
        <Icon name='content' size="large"/>
      </Menu.Item>
      <Link to="/home">
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          className="TopMenu-Item"
        />
      </Link>
      {currentUser &&
        <>
          <Link to={`/issues`}>
            <Menu.Item
              name='issues'
              active={activeItem === 'issues'}
              onClick={handleItemClick}
              className="TopMenu-Item"
            />     
          </Link>
          <Link to={`/issues/new`}>
            <Menu.Item
              name='new issue'
              active={activeItem === 'new issue'}
              onClick={handleItemClick}
              className="TopMenu-Item"
            />
          </Link>
          <Menu.Item>
            <Popup
              trigger={<Icon name='pied piper alternate icon' size="big" />}
              content={() => richardQuotes()}
              hideOnScroll
              size="small"
            />
          </Menu.Item>
        </>
        
      }
    </Menu>
  );
} 

export default Header;