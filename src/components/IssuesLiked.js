import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header, Grid, Divider } from 'semantic-ui-react'
import Issue from './Issue';
import SearchField from './SearchField';
import Loading from './Loading';
import { findIds, findIssues } from '../Library/Helpers';
import '../resources/FavoriteIssues.css';

const IssuesLiked = props => {
  
  const searchTerm = useSelector(state => state.term.searchTerm)
  const issues = useSelector(state => state.issue.issues)
  const currentUser = useSelector(state => state.user.keyHolder)
  const [ issueIds, setIssueIds ] = useState([])

  useEffect(() => {
    const thumbsUp = currentUser && currentUser.like_issues.filter(like => like.is_like)
    const ids = currentUser && findIds(thumbsUp)
    setIssueIds(ids)

  }, [currentUser])

  const renderIssues = () => {
    const filteredIssues = findIssues(issues, issueIds).filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} displayBody={false} />
    ))
  }

  return (
    <div id="FavoriteIssue-Container">
    <Header as='h1' textAlign="center" color="blue" className="FavoriteIssue-Header">Issues You Like</Header>
    {
    issues ?
    <React.Fragment>
      <SearchField />
      <Divider />
      <Grid columns={1} divided id="Issue">
        {renderIssues()}
      </Grid> 
    </React.Fragment> : <Loading loadingClass={true} /> 
    }
    </div>
  )
}

export default IssuesLiked;