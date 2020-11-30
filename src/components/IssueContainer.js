import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Grid, Pagination, Divider } from 'semantic-ui-react';
import Issue from './Issue';
import SearchField from './SearchField';
import Loading from './Loading';
import { SET_ISSUE_INDEX } from '../store/type';
import '../resources/IssueContainer.css';

const IssueContainer = props => {

  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(true)
  const searchTerm = useSelector(state => state.term.searchTerm)
  const issuesIndex = useSelector(state => state.issue.issuesIndex)

  useEffect(() => {
    // fetch issues
    fetch("http://localhost:3000/issues")
    .then(r => r.json())
    .then(issues => {
      const { issue_pages, page, pages } = issues
      dispatch({ type: SET_ISSUE_INDEX, payload: { issue_pages, page, pages } })
      setLoading(false)
    })
  }, [dispatch])

  const renderIssues = () => {
    const filteredIssues = issuesIndex && issuesIndex.issue_pages.filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} displayBody={false} />
    ))
  }

  const handlePage = (e, { activePage }) => {
    let gotopage = { activePage }
    let pagenum = gotopage.activePage
    let pagestring = pagenum.toString()
    setLoading(true)
    
    const url = "http://localhost:3000/issues/?page=" + pagestring

    fetch(url)
    .then(res => res.json())
    .then(issuesIndex => {
      const { issue_pages, page, pages } = issuesIndex
      dispatch({ type: SET_ISSUE_INDEX, payload: { issue_pages, page, pages } })
      setLoading(false)
    })
  }
  
  return (
      <div id="IssueContainer">
        <Header as='h1' textAlign="center" color="blue" className="IssueContainer-Header">All Issues</Header>
        {
          loading ?
          <Loading loadingClass={true} /> 
          :
          <React.Fragment>
            <SearchField setSearchTerm={props.setSearchTerm} />
            <Divider />
            <Grid columns={1} divided id="Issue">
              { renderIssues()}
            </Grid> 
            <Pagination
              // raised
              boundaryRange={0}
              defaultActivePage={issuesIndex.page}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={issuesIndex.pages}
              onPageChange={handlePage}
              className="Pagination"
            />
          </React.Fragment>
        }
      </div>
  );
}

export default IssueContainer;