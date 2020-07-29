import React, { Component } from 'react';
import IssueContainer from './IssueContainer';

class Main extends Component {

  render() {
    return(
      <div className="ui container">
        <IssueContainer
          searchTerm={this.state.searchTerm} 
          setSearchTerm={this.setSearchTerm}
          issues={this.state.issues} 
          handleDelete={this.deleteIssue}
          />
      </div>
    );
  }
} 

export default Main;