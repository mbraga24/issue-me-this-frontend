import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react'
import Issue from './Issue';
import SearchField from './SearchField';
import '../resources/FavoriteIssues.css';

const ManageIssues = props => {

  const searchTerm = useSelector(state => state.term.searchTerm)
  const issues = useSelector(state => state.issue.issues)
  const currentUser = useSelector(state => state.user.keyHolder)

  const findIssueIds = (userIssues) => {
    return userIssues.map(issue => issue.id)
  }

  // export const findIds = userList => {
  //   return userList.map(item => item.issue_id)
  // }

  // const findIssues = () => {
  //   return issues.filter(issue => (issueIds.includes(issue.id)))
  // }

  const findIssues = () => {
    return issues.filter(issue => (findIssueIds(currentUser.issues).includes(issue.id)))
  }

  const renderIssues = () => {
    const filteredIssues = findIssues().filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} displayBody={false} />
    ))
  }

  return (
    <div id="FavoriteIssue-Container">
      <Header as='h1' textAlign="center" color="grey" className="FavoriteIssue-Header">
        Manage Issues
      </Header>
      <SearchField />
      <Grid columns={1} divided id="Issue">
        {currentUser && renderIssues()}
      </Grid>
    </div>
  )
}

export default ManageIssues;