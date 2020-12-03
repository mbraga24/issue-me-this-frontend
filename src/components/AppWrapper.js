import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Icon, Menu, Sidebar } from 'semantic-ui-react'
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import MenuBar from './MenuBar';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import IssueContainer from './IssueContainer';
import UserContainer from './UserContainer';
import NewIssueForm from './NewIssueForm';
import ShowIssue from './ShowIssue';
import Account from './Account';
import FavoriteIssues from './FavoriteIssues';
import IssuesLiked from './IssuesLiked';
import UserIssues from './UserIssues';
import UpdateAccount from './UpdateAccount';
import '../resources/AppWrapper.css';
import '../resources/Loading.css';
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
              color="blue"
              as={Menu}
              animation='overlay'
              inverted
              onHide={() => closeOnClick(false)}
              vertical
              visible={visible}
              width='wide'
            >
              <Menu.Item as={Link} to="/">
                <Icon name='home' size="large" />
                Home
              </Menu.Item>
              <Menu.Item as={Link} to="/users">
                <Icon name='users' size="large" />
                Users
              </Menu.Item>
              <Menu.Item as={Link} to="/issues">
                <Icon name='list alternate outline' size="large" />
                Issues
              </Menu.Item>
              { 
              currentUser ?
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
              <MenuBar toggleMenu={toggleMenu} />
                <Switch>  
                    <Container id="AppWrapper-Container">
                      <Route exact path="/" component={Home} />
                      { 
                        currentUser &&
                          <React.Fragment>
                            <Route path="/account/:id" component={Account} />
                            <Route path="/new/issue" component={NewIssueForm} />
                            <Route path="/issues/:id" component={ShowIssue} />
                            <Route path="/favorite-issues" component={FavoriteIssues} />
                            <Route path="/liked-issues" component={IssuesLiked} />
                            <Route path="/user-issues/:id" component={UserIssues} />
                            <Route path="/update/account" component={UpdateAccount} /> 
                          </React.Fragment>
                        }
                          <React.Fragment>
                            <Route path="/login" component={Login} />
                            <Route path="/signup" component={Signup} />
                            <Route exact path="/issues" component={IssueContainer} />
                            <Route exact path="/users" component={UserContainer} />
                          </React.Fragment>

                    </Container>
                </Switch>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>
  );
}

export default AppWrapper;