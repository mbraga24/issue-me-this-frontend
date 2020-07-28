import React, { Component } from 'react';

class SearchIssue extends Component {

  handleOnChange = (event) => {
    this.props.setSearchTerm(event.target.value)
  }

  render() {
    return(
      <div class="ui grid header">
        <div class="three wide column">
          <div class="ui search">
            <div class="ui icon input">
              <input type="text" value={this.props.searchTerm} onChange={this.handleOnChange}tabindex="0" class="prompt" autocomplete="on" placeholder="Search keywords"  />
              <i aria-hidden="true" class="search icon"></i>
            </div>
            <div class="results transition">
              <div class="message empty"><div class="header">No results found.</div></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default SearchIssue;