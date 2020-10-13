import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SET_SEARCH_TERM } from '../store/type';
// import useFormFields from '../hooks/useFormFields';

const SearchIssue = props => {

  const [ searchTerm, setSearchTerm ] = useState("")
  const dispatch = useDispatch()

  const handleOnChange = event => {
    setSearchTerm(event.target.value)
    dispatch({ type: SET_SEARCH_TERM, payload: searchTerm })
  }
  
  return (
    <div className="ui grid header">
      <div className="three wide column">
        <div className="ui search">
          <div className="ui icon input">
            <input type="text" name="searchTerm" value={searchTerm} onChange={handleOnChange} tabIndex="0" className="prompt" autoComplete="on" placeholder="Search keywords" />
            <i aria-hidden="true" className="search icon"></i>
          </div>
          <div className="results transition">
            <div className="message empty"><div className="header">No results found.</div></div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default SearchIssue;