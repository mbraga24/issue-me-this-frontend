import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../resources/TopMenuBar.css';

const TopMenuBar = props => {

  const currentUser = useSelector(state => state.user.keyHolder)
  const [ activeItem, setActiveItem ] = useState("home")
  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  return(
    <Menu color="grey" inverted id="Top-Menu-Bar">
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
        </>
      }
    </Menu>
  );
} 

export default TopMenuBar;