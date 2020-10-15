import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Header } from 'semantic-ui-react'
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
      <Container id="IssueContainer">
        <Header as='h1' textAlign="center" className="IssueContainer-Header">All Issues</Header>
        <SearchIssue setSearchTerm={props.setSearchTerm} />
        {renderIssues()}
      </Container>
  );
}

export default IssueContainer;