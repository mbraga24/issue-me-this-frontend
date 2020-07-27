import React from 'react';
import Issue from './Issue';
import '../IssueContainer.css';

const IssueContainer = (props) => {

  const renderIssues = () => {
    return props.issues.map(issue => (
      <Issue key={issue.id} issue={issue} user={issue.user_info} comment={issue.comment_details}/>
    ))
  }
  console.log("IssueContainer ====> ", props) 
  return (
    <div className="ui basic segment container">
      {/* <AddIssueForm handleNewIssue={this.props.handleNewIssue}/> */}
      {renderIssues()}
    </div>
  );
}

export default IssueContainer;