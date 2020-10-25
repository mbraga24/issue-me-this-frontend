import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react'
import Issue from './Issue';
import SearchField from './SearchField';
import '../resources/IssueContainer.css';

const IssueContainer = props => {

  const searchTerm = useSelector(state => state.term.searchTerm)
  const issues = useSelector(state => state.issue.issues)

  const renderIssues = () => {
    const filteredIssues = issues.filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} displayBody={false} />
    ))
  }

  return (
      <div id="IssueContainer">
        <Header as='h1' textAlign="center" className="IssueContainer-Header">All Issues</Header>
        <SearchField setSearchTerm={props.setSearchTerm} />
        <Grid columns={1} divided id="Issue">
          {renderIssues()}
        </Grid>
      </div>
  );
}

export default IssueContainer;