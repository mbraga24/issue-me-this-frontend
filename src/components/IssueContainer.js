import React from 'react';
import Issue from './Issue';
import SearchIssue from './SearchIssue';
import '../IssueContainer.css';

const IssueContainer = (props) => {

  const renderIssues = () => {
    const filteredIssues = props.issues.filter(issue => issue.title.toLowerCase().includes(props.searchTerm.toLowerCase()))

    return filteredIssues.map(issue => (
      <Issue
        key={issue.id}
        issue={issue}
        handleDeleteIssue={props.handleDeleteIssue}
        currentUser={props.currentUser}
      />
    ))
  }

  return (
    <div className="ui basic segment container">
      <h1 className="ui center aligned header">All Issues</h1>
      <SearchIssue setSearchTerm={props.setSearchTerm} />
      {renderIssues()}
    </div>
  );
}

export default IssueContainer;