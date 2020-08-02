import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import IssueContainer from './components/IssueContainer';
import UserContainer from './components/UserContainer';
import SideBar from './components/SideBar';
import Header from './components/Header';
import NewIssueForm from './components/NewIssueForm';
import ShowIssue from './components/ShowIssue';
import UserProfile from './components/UserProfile';
import './App.css';

class App extends Component {
  state = {
    searchTerm: "",
    issues: [],
    users: [],
    toggle: false,
    currentUser: ""
  }

  componentDidMount() {
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
      this.handleLogin(loggedInUser)
    })
   }

    // fetch issues
    fetch("http://localhost:3000/issues")
    .then(r => r.json())
    .then(issues => {
      this.setState({ issues })
    })
    // fetch users
    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then(users => {
      this.setState({ users })
    })
  }

  toggleMenu = () => {
    this.setToggle()
  }

  setSearchTerm = (searchTerm) => {
    this.setState({ searchTerm })
  }

  setToggle = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }))
  }

  closeSidebarOnClick = () => {
    if (this.state.toggle) {
      this.setToggle()
    }
  }
  
  // =============================================
  //                 HANDLE ISSUE
  // =============================================

  addIssue = newIssue => {
    this.setState({
      issues: [...this.state.issues, newIssue]
    })
  }

  deleteIssue = issueId => {
    const updatedIssues = this.state.issues.filter(issue => issue.id !== issueId)
    this.setState({ issues: updatedIssues })
  }

  // sort issues from greatest to least
  sortedIssues = () => {
    return this.state.issues.sort((a, b) => b.id - a.id)
  }

  // =============================================
  //             HANDLE USER
  // =============================================

  addUser = newUser => {
    this.setState({ users: [...this.state.users, newUser] })
    this.handleLogin(newUser)
  }

  // =============================================
  //             HANDLE LOGIN / OUT 
  // =============================================

  handleLogin = currentUser => {
    // set current user and redirect user to "/issues" page
    this.setState({ currentUser }, () => {
      this.props.history.push('/issues')
    })
    // NOTE:
    // For the App component to have access to the browser history 
    // you need to import withRouter at the top of the file:
    // import { withRouter } from 'react-router-dom'

    // Then pass in the App component as an argument at the bottom of 
    // the file and export it like so: 
    // export default withRouter(App);
  }

  handleLogout = () => {
    // remove token from localStorage
    localStorage.removeItem("token")
    
    // set currentUser state back to null
    this.setState({ 
      currentUser: null
    })
  }

 render() {
  return (
    <div>
      <Header onToggleMenu={this.toggleMenu} currentUser={this.state.currentUser}/>
        <div className="ui attached pushable App-sidebar">
          <SideBar toggleMenu={this.state.toggle} handleLogout={this.handleLogout} currentUser={this.state.currentUser}/>
          <div className={`ui pusher ${this.state.toggle ? 'dimmed' : ''}`} onClick={this.closeSidebarOnClick}>
            <Switch>  
              <Route path="/login" render={routeProps => <Login {...routeProps} handleLogin={this.handleLogin} />} />
              <Route path="/signup" render={routeProps => <SignUp {...routeProps} handleNewUser={this.addUser}/>} />
              <Route exact path="/issues" render={() => (
                <IssueContainer 
                  searchTerm={this.state.searchTerm} 
                  setSearchTerm={this.setSearchTerm}
                  handleDeleteIssue={this.deleteIssue}
                  issues={this.sortedIssues()}
                  currentUser={this.state.currentUser} />
                )} />
                <Route path="/users/:id" render={routeProps => <UserProfile {...routeProps} currentUser={this.state.currentUser} />} />
              <Route path="/issues/new" render={routeProps => <NewIssueForm {...routeProps} handleNewIssue={this.addIssue} currentUser={this.state.currentUser} />} />
              <Route path="/issues/:id" render={routeProps => <ShowIssue {...routeProps} currentUser={this.state.currentUser}/>} />
              <Route exact path="/users" render={() => (
                <UserContainer 
                  users={this.state.users} />
                )} />
              <Route exact path="/home" render={routeProps => <Home {...routeProps} currentUser={this.state.currentUser}/>} />
            </Switch>
          </div>
      </div>
    </div>
  );
 }
}


export default withRouter(App);