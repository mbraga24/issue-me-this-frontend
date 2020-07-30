import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import '../ShowIssue.css';

class ShowIssue extends Component {

  state = {
    issue: null
  }

  componentDidMount() {
    const issueId = this.props.match.params.id
    fetch(`http://localhost:3000/issues/${issueId}`)
      .then(r => r.json())
      .then(issue => {
        this.setState({ issue })
      })
  }

  renderComments = () => {
    return this.state.issue.comments.map(comment => (
      <Comment key={comment.id} user={comment.user} comment={comment} />
    ))
  }

  render() { 
    if (!this.state.issue) {
      return <h1>Loading...</h1>
    }

    const { title, issueBody, user } = this.state.issue
    const imgUrl = `https://semantic-ui.com/images/avatar/small/${user.avatar}.jpg`

    return (
      <div className="ui container" >
        <h1 className="ui center aligned header">Issue</h1>
        <div className="ui card fluid">
          <div className="content">
            <div className="header">
              {title}
            <Link to={`/users/${user.id}`}>
              <img src={imgUrl} alt={user.username} className="ui mini right floated image" />
            </Link>
            </div>
          </div>
          <div className="content">
            <div className="description">
              {issueBody}
            </div>
            <Link to={`/users/${user.id}`}>
              <p className="ui right aligned">{user.username}</p>
            </Link>
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