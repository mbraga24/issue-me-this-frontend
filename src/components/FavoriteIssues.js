import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react'
import Issue from './Issue';
import SearchField from './SearchField';
import { findIds, findIssues } from '../Library/Helpers';
import '../resources/FavoriteIssues.css';

const FavoriteIssues = props => {

  const searchTerm = useSelector(state => state.term.searchTerm)
  const pathname = props.location.pathname.split("-")[0]
  const issues = useSelector(state => state.issue.issues)
  const currentUser = useSelector(state => state.user.keyHolder)
  const [ issueIds, setIssueIds ] = useState([])

  console.log("props --->", pathname)

  useEffect(() => {
    const ids = currentUser && findIds(currentUser.favorites, pathname)
    setIssueIds(ids)

  }, [currentUser, pathname])

  const renderIssues = () => {
    const filteredIssues = findIssues(issues, issueIds).filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} displayBody={false} />
    ))
  }

  return (
    <div id="FavoriteIssue-Container">
      <Header as='h1' textAlign="center" color="grey" className="FavoriteIssue-Header">Your Favorite Issues</Header>
      <SearchField />
      <Grid columns={1} divided id="Issue">
        {currentUser ? renderIssues() : <h1>Empty</h1>}
      </Grid>
    </div>
  )
}

export default FavoriteIssues;