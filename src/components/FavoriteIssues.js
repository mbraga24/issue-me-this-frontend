import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid, Divider } from 'semantic-ui-react'
import Issue from './Issue';
import SearchField from './SearchField';
import Loading from './Loading';
import MissingTemplate from './MissingTemplate';
import { findIds, findIssues } from '../Library/Helpers';
import '../resources/FavoriteIssues.css';

const FavoriteIssues = props => {

  const searchTerm = useSelector(state => state.term.searchTerm)
  const issues = useSelector(state => state.issue.issues)
  const currentUser = useSelector(state => state.user.keyHolder)
  const [ issueIds, setIssueIds ] = useState([])

  useEffect(() => {
    const ids = currentUser && findIds(currentUser.favorites)
    setIssueIds(ids)

  }, [currentUser])

  const renderIssues = () => {
    const filteredIssues = findIssues(issues, issueIds).filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
    if (filteredIssues.length !== 0) {
      return filteredIssues.map(issue => (
        <Issue key={issue.id} issue={issue} displayBody={false} />
      ))
    } else {
      return <MissingTemplate header="No favorite issues" />
    }
  }
  
  return (
    <div id="FavoriteIssue-Container">
    <Header as='h1' textAlign="center" color="blue" className="FavoriteIssue-Header">Your Favorite Issues</Header>
    <Divider />
    <SearchField />
    {  
      issues ?
      <React.Fragment>
        <Grid columns={1} id="Issue">
          {renderIssues()}
        </Grid> 
      </React.Fragment> : <Loading loadingClass={true} /> 
    } 
    </div> 
  )
}

export default FavoriteIssues;