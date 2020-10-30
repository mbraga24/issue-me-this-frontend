import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react'
import Issue from './Issue';
import SearchField from './SearchField';
import { findIds, findIssues } from '../Library/Helpers';
import '../resources/FavoriteIssues.css';

const UserIssues = props => {

  const searchTerm = useSelector(state => state.term.searchTerm)
  const pathname = props.location.pathname.split("-")[0]
  const currentUser = useSelector(state => state.user.keyHolder)
  const issues = useSelector(state => state.issue.issues)
  const users = useSelector(state => state.user.users)
  const userId = parseInt(props.match.params.id)
  const [ userProfile, setUserProfile ] = useState(null)
  const [ issueIds, setIssueIds ] = useState([])

  console.log("props --->", pathname)

  useEffect(() => {
    const user = users && users.find(user => user.id === userId)
    const userIssues = issues && issues.filter(issue => issue.user.id === userId)
    const ids = findIds(userIssues, pathname)
    setUserProfile(user)
    setIssueIds(ids)

  }, [userId, users, issues, userProfile, pathname])

  const renderIssues = () => {
    const filteredIssues = findIssues(issues, issueIds).filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} displayBody={false} />
    ))
  }

  return (
    <div id="FavoriteIssue-Container">
      <Header as='h1' textAlign="center" color="grey" className="FavoriteIssue-Header">
        {(currentUser && currentUser.id === userId) ? `Manage Issues` : userProfile && `${userProfile.first_name} ${userProfile.last_name} Profile` }
      </Header>
      <SearchField />
      <Grid columns={1} divided id="Issue">
        {userProfile ? renderIssues() : <h1>EMPTY</h1>}
      </Grid>
    </div>
  )
}

export default UserIssues;