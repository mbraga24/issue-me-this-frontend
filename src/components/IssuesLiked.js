import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react'
import Issue from './Issue';
import SearchField from './SearchField';
import { findIds } from '../Library/Helpers';
import '../resources/FavoriteIssues.css';

const IssuesLiked = () => {
  
  const searchTerm = useSelector(state => state.term.searchTerm)
  const issues = useSelector(state => state.issue.issues)
  const currentUser = useSelector(state => state.user.keyHolder)
  const [ issueIds, setIssueIds ] = useState([])

  useEffect(() => {
    const ids = findIds(currentUser.favorites)
    setIssueIds(ids)

  }, [currentUser])

  const findIssues = () => {
    return issues.filter(issue => (issueIds.includes(issue.id)))
  }

  const renderIssues = () => {
    const filteredIssues = findIssues().filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} displayBody={false} />
    ))
  }

  return (
    <div id="FavoriteIssue-Container">
      <Header as='h1' textAlign="center" color="grey" className="FavoriteIssue-Header">Issues You Like</Header>
      <SearchField />
      <Grid columns={1} divided id="Issue">
        {currentUser ? renderIssues() : <h1>Empty</h1>}
      </Grid>
    </div>
  )
}

export default IssuesLiked;