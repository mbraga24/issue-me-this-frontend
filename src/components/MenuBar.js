import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, Icon, Dropdown } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import '../resources/TopMenuBar.css';

const TopMenuBar = props => {
  const pathName = props.location.pathname.split("/")[1]
  const currentUser = useSelector(state => state.user.keyHolder)
  const [ activeItem, setActiveItem ] = useState(`${pathName}`)
  const handleItemClick = (e, { name }) => {
    setActiveItem(name)
  }

  return(
    <Menu color="blue" inverted id="Top-Menu-Bar">
      <Menu.Item
        active={activeItem === 'more'}
        onClick={props.toggleMenu}
      >
        <Icon name='content' size="large"/>
      </Menu.Item>
        <Menu.Item
          as={Link}
          to={`/`}
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          className="TopMenu-Item"
        />
      {
        currentUser &&
        <>
          <Dropdown text='More' pointing className='TopMenu-Item link item'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/issues`}>Issues</Dropdown.Item>
              <Dropdown.Item as={Link} to={`/users`}>Users</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item
            as={Link}
            to={`/account/${currentUser.id}`}
            name='account'
            active={activeItem === 'account'}
            onClick={handleItemClick}
            className="TopMenu-Item"
          /> 
          <Menu.Item
            as={Link}
            to={`/new/issue`}
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

export default withRouter(TopMenuBar);