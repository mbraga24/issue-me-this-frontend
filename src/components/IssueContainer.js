import React from 'react';
import Issue from './Issue';
import SearchIssue from './SearchIssue';
import '../IssueContainer.css';

const IssueContainer = (props) => {

  const renderIssues = () => {

    const filteredIssues = props.issues.filter(issue => issue.title.toLowerCase().includes(props.searchTerm.toLowerCase()))

    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} user={issue.user_info} comment={issue.comment_details}/>
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