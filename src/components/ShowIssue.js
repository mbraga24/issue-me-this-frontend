import React, { Component } from 'react';
import Comment from './Comment';

class ShowIssue extends Component {

  state = {
    issue: null
  }

  componentDidMount() {
    console.log("CURRENT ID FOR THIS ISSUE =====> ", this.props.match.params.id)
    const issueId = this.props.match.params.id
    
    fetch(`http://localhost:3000/issues/${issueId}`)
    .then(r => r.json())
    .then(issue => {
      this.setState({ issue })
    })
  }

  renderComments = () => {
    console.log("INSIDE COMMENTS ====> ", this.state.issue.list_comments)
    return this.state.issue.comment_details.map(comment => (
      <Comment key={comment.id} user={comment.user} comment={comment} />
    ))
  }

  render() {
    // console.log("ShowIssue ====> ", this.state.issue)

    // BUG - KEEPS SHOWING UP ON OTHER THE ADD ISSUE FORM
    if (!this.state.issue) {
      return <h1>Loading...</h1>
    }

    const { title, issue_body } = this.state.issue

    return (
    <div className="ShowIssue">
      <div class="ui card fluid">
        <div class="content"><div class="header">{title}</div></div>
          <div class="content">
            <div class="description">
              {issue_body}
            </div>
          </div>
        </div>

      <div className="ui comments">
        <h3 className="ui dividing header">Comments</h3>
        {this.renderComments()}
        <form className="ui reply form">
          <div className="field"><textarea rows="3"></textarea></div>
          <button className="ui icon primary left labeled button">
            <i aria-hidden="true" className="edit icon"></i>
            Add Reply
          </button>
        </form>
      </div>
    </div>
            
    );
  }
}

export default ShowIssue;