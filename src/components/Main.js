import React, { Component } from 'react';
import IssueContainer from './IssueContainer';

class Main extends Component {

  state = {
    searchTerm: "",
    issues: []
  }

  componentDidMount() {
    fetch("http://localhost:3000/issues")
    .then(r => r.json())
    .then(dataIssues => {
      this.setState({
        issues: dataIssues
      })
    })
  }

  setSearchTerm = (searchTerm) => {
    this.setState({ searchTerm })
  }

  render() {
    return(
      <div className="Main">
        <IssueContainer 
          searchTerm={this.state.searchTerm} 
          setSearchTerm={this.setSearchTerm}
          issues={this.state.issues} 
          />
      </div>
    );
  }
} 

export default Main;