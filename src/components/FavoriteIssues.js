import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid } from 'semantic-ui-react'
import Issue from './Issue';
import SearchField from './SearchField';
import '../resources/FavoriteIssues.css';


const FavoriteIssues = props => {

  const searchTerm = useSelector(state => state.term.searchTerm)
  const issues = useSelector(state => state.issue.issues)
  const currentUser = useSelector(state => state.user.keyHolder)

  const findIssueIds = (user) => {
    return user.favorites.map(fav => fav.issue_id )
  }

  const findFavoriteIssues = () => {
    return issues.filter(issue => (findIssueIds(currentUser).includes(issue.id) ))
  }

  const renderIssues = () => {
    const filteredIssues = findFavoriteIssues().filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} displayBody={false} />
    ))
  }

  return (
    <div id="FavoriteIssue-Container">
      <Header as='h1' textAlign="center" color="grey" className="FavoriteIssue-Header">Your favorites</Header>
      <SearchField />
      <Grid columns={1} divided id="Issue">
        {currentUser && renderIssues()}
      </Grid>
    </div>
  )
}

export default FavoriteIssues;