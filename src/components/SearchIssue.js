import React, { useState } from 'react';
import _ from 'lodash'
import { useSelector, useDispatch } from 'react-redux';
import { SET_SEARCH_TERM } from '../store/type';
import { Search, Grid } from 'semantic-ui-react'
// import useFormFields from '../hooks/useFormFields';

const SearchIssue = props => {

  const dispatch = useDispatch()

  const source = useSelector(state => state.issue.issues)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ results, setResults ] = useState([])

  const handleResultSelect = (e, { result }) => {
    dispatch({ type: SET_SEARCH_TERM, payload: result.title })
  }

  const handleOnChange = (e, { value })  => {
    setIsLoading(true)
    dispatch({ type: SET_SEARCH_TERM, payload: value })

    setTimeout(() => {

      if (value === "") {
        dispatch({ type: SET_SEARCH_TERM, payload: "" }) 
        setIsLoading(false)
        setResults([])
      } 
        const re = new RegExp(_.escapeRegExp(value), 'i')
        const isMatch = (res) => re.test(res.title)
  
        setIsLoading(false)
        setResults(_.filter(source, isMatch))
    }, 200)
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Search
          aligned='right'
          loading={isLoading}
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleOnChange)}
          results={results}
        />
      </Grid.Column>
    </Grid>
    )
}

export default SearchIssue;