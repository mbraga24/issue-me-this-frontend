import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react'
import Issue from './Issue';
import SearchField from './SearchField';
import Loading from './Loading';
import '../resources/FavoriteIssues.css';

const UserIssues = props => {

  const searchTerm = useSelector(state => state.term.searchTerm)
  const pathname = props.location.pathname.split("-")[0]
  const currentUser = useSelector(state => state.user.keyHolder)
  const issues = useSelector(state => state.issue.issues)
  const users = useSelector(state => state.user.users)
  const userId = parseInt(props.match.params.id)
  const [ userProfile, setUserProfile ] = useState(null)

  useEffect(() => {
    const user = users && users.find(user => user.id === userId)
    setUserProfile(user)

  }, [userId, users, issues, userProfile, pathname])

  const findIssues = () => {
    return issues.filter(issue => issue.user.id === userId)
  }

  const renderIssues = () => {
    const filteredIssues = findIssues().filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} displayBody={false} />
    ))
  }

  return (
    <div id="FavoriteIssue-Container">
      {
        issues ? 
        <React.Fragment>
          <Header as='h1' textAlign="center" color="blue" className="FavoriteIssue-Header">
            {(currentUser && currentUser.id === userId) ? `Manage Issues` : userProfile && `${userProfile.first_name} ${userProfile.last_name} Profile` }
          </Header>
          <SearchField />
          <Grid columns={1} divided id="Issue">
            {renderIssues()}
          </Grid>
        </React.Fragment>
        : <Loading />
      }
    </div>
  )
}

export default UserIssues;