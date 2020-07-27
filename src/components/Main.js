import React, { Component } from 'react';
import IssueContainer from './IssueContainer';

class Main extends Component {

  state = {
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

  render() {
    return(
      <div className="Main">
        <IssueContainer issues={this.state.issues} />
      </div>
    );
  }
} 

export default Main;