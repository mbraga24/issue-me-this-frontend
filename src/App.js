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
    toggle: false
  }

  componentDidMount() {
    fetch("http://localhost:3000/issues")
    .then(r => r.json())
    .then(dataIssues => {
      this.setState({
        issues: dataIssues
      })
    })

    fetch("http://localhost:3000/users")
    .then(r => r.json())
    .then(dataUsers => {
      this.setState({
        users: dataUsers
      })
    })
  }

  setSearchTerm = (searchTerm) => {
    this.setState({ searchTerm })
  }

  deleteIssue = (issueId) => {
    console.log("DELETE ISSUE: ", updatedIssues)
    const updatedIssues = this.state.issues.filter(issue => issue.id !== issueId)
    this.setState({ issues: updatedIssues })
  }

  addIssue = (newIssue) => {
    this.setState({
      issues: [...this.state.issues, newIssue]
    })
  }

  setToggle = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle
    }))
  }

  toggleMenu = () => {
    this.setToggle()
  }

 render() {
  return (
    <div>
      <Header onToggleMenu={this.toggleMenu}/>
        <div className="ui attached pushable App-sidebar">
          <SideBar toggleMenu={this.state.toggle}/>
          <div className={`ui pusher ${this.state.toggle ? 'dimmed' : ''}`}>
            <Switch>  
                <Route path="/Login" component={Login} />
                <Route path="/SignUp" component={SignUp} />
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