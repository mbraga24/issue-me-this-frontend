import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react'
import Issue from './Issue';
import SearchField from './SearchField';
import '../resources/FavoriteIssues.css';

const UserIssues = props => {

  const searchTerm = useSelector(state => state.term.searchTerm)
  const currentUser = useSelector(state => state.user.keyHolder)
  const issues = useSelector(state => state.issue.issues)
  const users = useSelector(state => state.user.users)
  const userId = parseInt(props.match.params.id)
  const [ userProfile, setUserProfile ] = useState(null)

  useEffect(() => {
    const user = users.find(user => user.id === userId)
    setUserProfile(user)

  }, [users, userId])

  // HOW TO COMBINE THESE FUNCTIONS TO THE THE SAME ONES ON FAVORITE ISSUES AND LIKED ISSUES ?
  // CANNOT CHANGE HOW DATA RETURNS FROM SERIALIZER BECAUSE THE ISSUES OF A USER ARE ONE LEVEL DEEPER
   
  // const findTheseIssueIds = (userIssues) => {
  //   return userIssues.map(issue => (issue.id))
  // }

  const findTheseIssues = () => {
    return issues.filter(issue => issue.user.id === userId)
  }

  findTheseIssues()
  const renderIssues = () => {
    // const filteredIssues = findTheseIssues().filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
    const filteredIssues = findTheseIssues().filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} displayBody={false} />
    ))
  }

  console.log("USER ISSUES -->")
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