import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
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

  // handle issues and users initial fetch
  componentDidMount() {
    fetch("http://localhost:3000/issues")
    .then(r => r.json())
    .then(issues => {
      this.setState({ issues })
    })

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
  
  // =============================================
  //             HANDLE ISSUE LOGIC
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

  // =============================================
  //             HANDLE ISSUE USER
  // =============================================

  addUser = newUser => {
    this.setState({ users: [...this.state.users, newUser] })
    this.handleLogin(newUser)
  }

  // =============================================
  //             HANDLE LOGIN
  // =============================================

  handleLogin = currentUser => {
    this.setState({ currentUser })
    // ************************************************************
    //   CANNOT REDIRECT USER TO /issues PAGE FROM APP COMPONENT
    //   --------> remember to delete the redirect from signup page
    // ************************************************************
    // this.setState({ currentUser }, () => {
    //   this.props.history.push('/issues')
    // })
  }

 render() {
  //  console.log("APP ====>", this.state)
  return (
    <div>
      <Header onToggleMenu={this.toggleMenu}/>
        <div className="ui attached pushable App-sidebar">
          <SideBar toggleMenu={this.state.toggle}/>
          <div className={`ui pusher ${this.state.toggle ? 'dimmed' : ''}`}>
            <Switch>  
              <Route path="/login" component={Login} />
              <Route path="/signup" render={(routeProps) => <SignUp {...routeProps} handleNewUser={this.addUser}/>} />
              <Route exact path="/issues" render={() => (
                <IssueContainer 
                  searchTerm={this.state.searchTerm} 
                  setSearchTerm={this.setSearchTerm}
                  issues={this.state.issues} />
                )} />
              <Route path="/issues/new" render={routeProps => <NewIssueForm {...routeProps} handleNewIssue={this.addIssue}/>} />
              <Route path="/issues/:id" render={routeProps => <ShowIssue {...routeProps} />} />
              <Route exact path="/users" render={() => (
                <UserContainer 
                  users={this.state.users} />
                )} />
              <Route path="/users/:id" render={routeProps => <UserProfile {...routeProps} />} />
            </Switch>
          </div>
      </div>
    </div>
  );
 }
}

export default App;