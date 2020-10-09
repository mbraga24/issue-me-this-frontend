import React from 'react';
import { useSelector } from 'react-redux';
import Issue from './Issue';
import SearchIssue from './SearchIssue';
import '../resources/IssueContainer.css';

const IssueContainer = props => {

  const searchTerm = useSelector(state => state.term.searchTerm)
  const issues = useSelector(state => state.issue.issues)

  const renderIssues = () => {
    const filteredIssues = issues.filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))

    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} currentUser={props.currentUser} />
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