import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Comment from './Comment';
import '../ShowIssue.css';

class ShowIssue extends Component {

  state = {
    issue: null,
    comments: ""
  }

  refreshPage = () => {
    window.location.reload(false);
  }

  componentDidMount() {
    const issueId = this.props.match.params.id
    fetch(`http://localhost:3000/issues/${issueId}`)
      .then(r => r.json())
      .then(issue => {
        this.setState({ 
          issue: issue
        })
      })
  }

  handleOnChange = (event) => {
    this.setState({ 
      [event.target.name]: event.target.value
     })
  }

  addCommentToIssue = (newComment) => {
    this.setState({
      issue: {...this.state.issue, comments: [...this.state.issue.comments, newComment]}
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    
    const new_coment = {
      title: this.state.title,
      comment_body: this.state.comment
    }

    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment: new_coment, 
        user_id: this.props.currentUser.id, 
        issue_id: this.state.issue.id
      })
    })
    .then(r => r.json())
    .then(newComment => {
      this.addCommentToIssue(newComment)
      this.setState({ comment: "" })
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
          { 
            this.props.currentUser ? 
            <form className="ui reply form" onSubmit={this.handleOnSubmit}>
              <div className="field">
                <input placeholder="Title" name="title" onChange={(event) => this.handleOnChange(event)}/>
              </div>
              <div className="field">
                <textarea name="comment" rows="3" onChange={(event) => this.handleOnChange(event)}></textarea>
              </div>
              <button className="ui icon primary left labeled button">
                <i aria-hidden="true" className="edit icon"></i>
                Add Reply
              </button>
            </form>
            : 
              <Button.Group size='large'>
                <Link to="/login">
                  <Button color="green">Login</Button>
                </Link>
                <Button.Or />
                <Link to="/signup">
                  <Button color="blue">Sign up</Button>
                </Link>
              </Button.Group>
          }
        </div>
      </div>
    );
  }
}

export default ShowIssue;