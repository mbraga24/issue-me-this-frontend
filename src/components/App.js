import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import  { useSelector, useDispatch } from 'react-redux';
import { SET_USERS, SET_ISSUES, SET_KEY_HOLDER, SET_COMMENTS } from '../store/type';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import IssueContainer from './IssueContainer';
import UserContainer from './UserContainer';
import SideBar from './SideBar';
import Header from './Header';
import NewIssueForm from './NewIssueForm';
import ShowIssue from './ShowIssue';
import UserProfile from './UserProfile';
import '../resources/App.css';

const App = props => {

  // const [ searchTerm, setSearchTerm ] = useState("")
  const [ toggle, setToggle ] = useState(false)
  // const [ active, setActive ] = useState(true)
  // const [ issues, setIssues ] = useState([])
  // const [ users, setUsers ] = useState([])
  
  const currentUser = useSelector(state => state.user.keyHolder)
  const dispatch = useDispatch()

  useEffect(() => {
    // log user in when component mounts
    // check if user is loggedin with the id stored in localStorage
    // Additional metadata - authorization header convention
   if (localStorage.token) {
    fetch("http://localhost:3000/autologin", {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then(r => r.json())
    .then(user => {
      // set current user in store
      dispatch({ type: SET_KEY_HOLDER, payload: user })
    })
   }

    // fetch users
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then(users => {
      // set users in the store
      dispatch({ type: SET_USERS, payload: users })
    })

    // fetch issues
    fetch("http://localhost:3000/issues")
    .then(r => r.json())
    .then(issues => {
      // set issues in the store
      dispatch({ type: SET_ISSUES, payload: issues })
    })

    // fetch comments
    fetch("http://localhost:3000/comments")
    .then(r => r.json())
    .then(comments => {
      // set comments in the store
      dispatch({ type: SET_COMMENTS, payload: comments })
    })

  }, [dispatch])

  const toggleMenu = () => {
    setToggleRefactor()
  }

  const setToggleRefactor = () => {
    setToggle(!toggle)
  }

  const closeSidebarOnClick = () => {
    toggle && setToggleRefactor()
  }

  return (
    <div>
      <Header onToggleMenu={toggleMenu} currentUser={currentUser}/>
        <div className="ui attached pushable App-sidebar">
          <SideBar toggleMenu={toggle} />
            <div className={`ui pusher ${toggle ? 'dimmed' : ''}`} onClick={closeSidebarOnClick}>
              <Switch>  
                <Route path="/login" render={routeProps => <Login {...routeProps} />} />
                <Route path="/signup" render={routeProps => <SignUp {...routeProps} />} />
                <Route exact path="/issues" render={() => ( <IssueContainer /> )} />
                <Route path="/users/:id" render={() => <UserProfile />} />
                {/* handleNewIssue={addIssue} */}
                <Route path="/issues/new" render={routeProps => <NewIssueForm {...routeProps} />} />
                <Route path="/issues/:id" render={() => <ShowIssue />} />
                <Route exact path="/users" render={() => ( <UserContainer /> )} />
                <Route exact path="/home" render={routeProps => <Home {...routeProps} />} />
            </Switch>
          </div>
      </div>
    </div>
  );
}

export default withRouter(App);

