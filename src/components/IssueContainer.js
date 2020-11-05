import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Header, Grid, Pagination } from 'semantic-ui-react'
import Issue from './Issue';
import SearchField from './SearchField';
import Loading from './Loading';
import { SET_ISSUE_INDEX } from '../store/type';
import '../resources/IssueContainer.css';

const IssueContainer = props => {

  const searchTerm = useSelector(state => state.term.searchTerm)
  const dispatch = useDispatch()
  const issuesIndex = useSelector(state => state.issue.issuesIndex)

  const renderIssues = () => {
    const filteredIssues = issuesIndex.issue_pages.filter(issue => issue.title.toLowerCase().includes(searchTerm.toLowerCase()))
  
    return filteredIssues.map(issue => (
      <Issue key={issue.id} issue={issue} displayBody={false} />
    ))
  }

  const handlePage = (e, { activePage }) => {
    let gotopage = { activePage }
    let pagenum = gotopage.activePage
    let pagestring = pagenum.toString()

    const url = "http://localhost:3000/issues/?page=" + pagestring

    fetch(url).then(res => res.json()).then(issuesIndex => {
      const { issue_pages, page, pages } = issuesIndex
      dispatch({ type: SET_ISSUE_INDEX, payload: { issue_pages, page, pages } })
    })
  }
  
  return (
      <div id="IssueContainer">
        {
          issuesIndex ? 
          <React.Fragment>
            <Header as='h1' textAlign="center" color="grey" className="IssueContainer-Header">All Issues</Header>
            <SearchField setSearchTerm={props.setSearchTerm} />
            <Pagination
              boundaryRange={0}
              defaultActivePage={issuesIndex.page}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={issuesIndex.pages}
              onPageChange={handlePage}
              className="Pagination"
              // onPageChange={(event, data) => console.log(data.activePage)}
            />
            <Grid columns={1} divided id="Issue">
              {/* <Segment loading> */}
                {renderIssues()}
              {/* </Segment> */}
            </Grid> 
            <Pagination
              boundaryRange={0}
              defaultActivePage={issuesIndex.page}
              firstItem={null}
              lastItem={null}
              siblingRange={1}
              totalPages={issuesIndex.pages}
              onPageChange={handlePage}
              className="Pagination"
              // onPageChange={(event, data) => console.log(data.activePage)}
            />
          </React.Fragment>
          : <Loading />
        }
      </div>
  );
}

export default IssueContainer;