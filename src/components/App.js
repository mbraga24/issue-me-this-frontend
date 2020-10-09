import React, { useEffect, useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import  { useSelector, useDispatch } from 'react-redux';
import { SET_USERS, SET_ISSUES } from '../store/type';
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

  const [ searchTerm, setSearchTerm ] = useState("")
  const [ currentUser, setCurrentUser ] = useState("")
  const [ messageHeader, setMessageHeader ] = useState("")
  const [ messageType, setMessageType ] = useState("")
  const [ toggle, setToggle ] = useState(false)
  // const [ active, setActive ] = useState(true)
  const [ messageVisible, setMessageVisible ] = useState(false)
  const [ message, setMessage ] = useState([])
  // const [ issues, setIssues ] = useState([])
  // const [ users, setUsers ] = useState([])

  const users = useSelector(state => state.user.users)
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
    .then(loggedInUser => {
      // set current user in state
      handleLogin(loggedInUser)
    })
   }

    // fetch issues
    fetch("http://localhost:3000/issues")
    .then(r => r.json())
    .then(issues => {
      // setIssues(issues)
      dispatch({ type: SET_ISSUES, payload: issues })
    })
    // fetch users
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then(users => {
      // setUsers(users)
      dispatch({ type: SET_USERS, payload: users })
    })
  }, [dispatch])

  const toggleMenu = () => {
    setToggleRefactor()
  }

  const setSearchTermRefactor = term => {
    // console.log("app ---> ",term)
    setSearchTerm(term)
  }

  const setToggleRefactor = () => {
    setToggle(!toggle)
  }

  const closeSidebarOnClick = () => {
    toggle && setToggleRefactor()
  }
  
  // =============================================
  //                 HANDLE ISSUE
  // =============================================

  // sort issues from greatest to least
  // const sortedIssues = () => {
  //   return issues.sort((a, b) => b.id - a.id)
  // }

  // =============================================
  //             HANDLE USER
  // =============================================

  const addUser = newUser => {
    this.setState({ users: [...users, newUser] })
    this.handleLogin(newUser)
  }

  // =============================================
  //             HANDLE LOGIN / OUT 
  // =============================================

  const handleLogin = currentUser => {
    setCurrentUser(currentUser)
    // this.props.history.push('/issues')
  }

  const handleLogout = () => {
    // remove token from localStorage
    localStorage.removeItem("token")
    
    // set currentUser state back to null
    this.setState({ 
      currentUser: null
    })
  }

  // =============================================
  //               HANDLE MESSAGES
  // =============================================

  const handleMessages = (data) => {
    if (data.message) {
       setMessageVisible(!messageVisible)
       setMessageHeader(data.header)
       setMessageType(data.type)
       setMessage([...data.message])
      handleDismissCountDown()
    }
  }

  const renderMessage = () => {
    return message.map(message => <li key={message} className="content">{message}</li> )
  }

  const handleDismissOnClick = () => {
    setMessageVisible(!messageVisible)
  }

  const handleDismissCountDown = () => {
    setTimeout(() => {
      setMessageVisible(!messageVisible)
    }, 4000)
  }

  return (
    <div>
      <Header onToggleMenu={toggleMenu} currentUser={currentUser}/>
        <div className="ui attached pushable App-sidebar">
          <SideBar toggleMenu={toggle} handleLogout={handleLogout} currentUser={currentUser}/>
            {
            (!!message && messageVisible) && (
              <div className={`ui ${messageType} message`}>
                <i aria-hidden="true" className="close icon" onClick={handleDismissOnClick}></i>
                <div className="content">
                  <div className="header">{messageHeader}</div>
                  <ul className="list">
                    {renderMessage() === [] ? renderMessage() : null}
                  </ul>
                </div>
              </div> )
            }
            <div className={`ui pusher ${toggle ? 'dimmed' : ''}`} onClick={closeSidebarOnClick}>
              <Switch>  
                <Route path="/login" render={routeProps => <Login {...routeProps} handleLogin={handleLogin} handleMessages={handleMessages}/>} />
                <Route path="/signup" render={routeProps => <SignUp {...routeProps} handleNewUser={addUser} handleMessages={handleMessages}/>} />
                <Route exact path="/issues" render={() => (
                  <IssueContainer 
                    searchTerm={searchTerm} 
                    setSearchTermRefactor={setSearchTermRefactor}
                    // handleDeleteIssue={deleteIssue}
                    // issues={sortedIssues()}
                    currentUser={currentUser} />
                  )} />
                <Route path="/users/:id" render={routeProps => <UserProfile {...routeProps} currentUser={currentUser} />} />
                {/* handleNewIssue={addIssue} */}
                <Route path="/issues/new" render={routeProps => <NewIssueForm {...routeProps} currentUser={currentUser} handleMessages={handleMessages} />} />
                <Route path="/issues/:id" render={routeProps => <ShowIssue {...routeProps} currentUser={currentUser} handleMessages={handleMessages}/>} />
                <Route exact path="/users" render={() => (
                  <UserContainer 
                    users={users} />
                  )} />
                <Route exact path="/home" render={routeProps => <Home {...routeProps} currentUser={currentUser}/>} />
            </Switch>
          </div>
      </div>
    </div>
  );
}

export default withRouter(App);

