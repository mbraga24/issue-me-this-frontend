import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Popup, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../resources/TopMenuBar.css';

const TopMenuBar = props => {

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
        onClick={props.toggleMenu}
      >
        <Icon name='content' size="large"/>
      </Menu.Item>
        <Menu.Item
          as={Link}
          to={`/home`}
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          className="TopMenu-Item"
        />
      {currentUser &&
        <>
            <Menu.Item
              as={Link}
              to={`/issues`}
              name='issues'
              active={activeItem === 'issues'}
              onClick={handleItemClick}
              className="TopMenu-Item"
            />     
            <Menu.Item
              as={Link}
              to={`/users`}
              name='users'
              active={activeItem === 'users'}
              onClick={handleItemClick}
              className="TopMenu-Item"
            />
            <Menu.Item
              as={Link}
              to={`/issues/new`}
              name='new issue'
              active={activeItem === 'new issue'}
              onClick={handleItemClick}
              className="TopMenu-Item"
            />
          <Menu.Item>
            <Popup
              trigger={<Icon name='pied piper alternate' size="big" />}
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

export default TopMenuBar;