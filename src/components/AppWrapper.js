import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Icon, Menu, Sidebar } from 'semantic-ui-react'
import { Route, Switch, Link } from 'react-router-dom';
import TopMenuBar from './TopMenuBar';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import IssueContainer from './IssueContainer';
import UserContainer from './UserContainer';
import NewIssueForm from './NewIssueForm';
import ShowIssue from './ShowIssue';
import Account from './Account';
import FavoriteIssues from './FavoriteIssues';
import IssuesLike from './IssuesLike';
import ManageIssues from './ManageIssues';
import '../resources/AppWrapper.css';
import { SET_KEY_HOLDER } from '../store/type';

const AppWrapper = props => {

  const currentUser = useSelector(state => state.user.keyHolder)
  const [ visible, setVisible ] = useState(false)
  const dispatch = useDispatch()


  const handleLogout = () => {
    localStorage.removeItem("token")
    dispatch({ type: SET_KEY_HOLDER, payload: null })
  }

  const toggleMenu = () => {
    setVisibilityStatus()
  }

  const setVisibilityStatus = () => {
    setVisible(!visible)
  }

  const closeOnClick = () => {
    visible && setVisibilityStatus()
  }

  return (
      <Grid columns={1}>
        <Grid.Column>
          <Sidebar.Pushable id="Pushable-Sidebar">
            <Sidebar
              color="teal"
              as={Menu}
              animation='overlay'
              inverted
              onHide={() => closeOnClick(false)}
              vertical
              visible={visible}
              width='wide'
            >
              <Menu.Item as={Link} to="/home">
                <Icon name='home' size="large" />
                Home
              </Menu.Item>
              <Menu.Item as={Link} to="/users">
                <Icon name='users' size="large" />
                Users
              </Menu.Item>
              { currentUser ?
                <>
                  <Menu.Item as={Link} to={`/account/${currentUser.id}`}>
                    <Icon name='id badge' size="large" />
                    Account
                  </Menu.Item>
                  <Menu.Item as={Link} to="/new/issue">
                    <Icon name='pen square' size="large" />
                    New Issue
                  </Menu.Item>
                  <Menu.Item onClick={handleLogout}>
                    <Icon name='sign-out alternate' size="large" />
                    Log out
                  </Menu.Item>
                </> 
                :
                <>
                  <Menu.Item as={Link} to="/signup">
                    <Icon name='write square' size="large" />
                    Sign up
                  </Menu.Item>
                  <Menu.Item as={Link} to="/login">
                    <Icon name='sign-in alternate' size="large" />
                    Sign in
                  </Menu.Item>
                </>
              }
            </Sidebar>
            <Sidebar.Pusher dimmed={visible}>
              <TopMenuBar toggleMenu={toggleMenu} />
                <Switch>  
                    <Container id="AppWrapper-Container">  
                      <Route path="/login" component={Login} />
                      <Route path="/signup" component={SignUp} />
                      <Route exact path="/issues" component={IssueContainer} />
                      <Route path="/account/:id" component={Account} />
                      <Route path="/new/issue" component={NewIssueForm} />
                      <Route path="/issues/:id" component={ShowIssue} />
                      <Route exact path="/users" component={UserContainer} />
                      <Route path="/favorite-issues" component={FavoriteIssues} />
                      <Route path="/issues-like" component={IssuesLike} />
                      <Route path="/manage-issues" component={ManageIssues} />
                      <Route exact path="/home" component={Home} />
                    </Container>
                </Switch>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>
  );
}

export default AppWrapper;