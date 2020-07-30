import React, { Component } from 'react';

class SearchIssue extends Component {

  handleOnChange = (event) => {
    this.props.setSearchTerm(event.target.value)
  }

  render() {
    return (
      <div className="ui grid header">
        <div className="three wide column">
          <div className="ui search">
            <div className="ui icon input">
              <input type="text" value={this.props.searchTerm} onChange={this.handleOnChange} tabIndex="0" className="prompt" autoComplete="on" placeholder="Search keywords" />
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

}

export default SearchIssue;