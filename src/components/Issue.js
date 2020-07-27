import React, { Component } from 'react';

class Issue extends Component {
  render() {
    const { title, issue_body } = this.props.issue
    // console.log("Issue ====> ", this.props)
    return (
      <div className="ui cards row ">
        <div className="ui fluid card">
          <div className="content">
            <div className="header">{title}</div>
            <div className="description">
              {issue_body}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Issue;