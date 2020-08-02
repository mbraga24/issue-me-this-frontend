import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Comment from './Comment';
import '../ShowIssue.css';

class ShowIssue extends Component {

  state = {
    issue: null,
    title: "",
    comment: "",
    comments: []
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

  // setting title and comment state on change
  handleOnChange = (event) => {
    this.setState({ 
      [event.target.name]: event.target.value
     })
  }

  // add comment to this issue
  addCommentToIssue = (newComment) => {
    this.setState({
      issue: {...this.state.issue, comments: [...this.state.issue.comments, newComment]}
    })
  }

  // delete comment from this issue 
  deleteComment = (deletedIssue) => {
    const updatedComments = this.state.issue.comments.filter(comment => comment.id !== deletedIssue)
    this.setState({ 
      issue: {...this.state.issue, comments: [...updatedComments]}
    })
  }

  handleOnSubmit = (event) => {
    event.preventDefault()
    // removing the synthetic event from the pool allowing the event properties
    // to be accessed in an asynchronous way
    event.persist()
    
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
      // reset title and comment values on form to an empty string
      event.target.title.value = ""
      event.target.comment.value = ""
    })
  }

  renderComments = () => {
    const sortedComments = this.state.issue.comments.sort((a, b) => b.id - a.id)
    
    return sortedComments.map(comment => (
      <Comment 
        key={comment.id} 
        commentId={comment.id} 
        comment={comment} 
        handleDeleteComment={this.deleteComment}
        currentUser={this.props.currentUser}/>
    ))
  }

  render() { 
    if (!this.state.issue) {
      return <h1>Loading...</h1>
    }

    const { title, issue_body, user } = this.state.issue
    const imgUrl = `https://semantic-ui.com/images/avatar/small/${user.avatar}.jpg`

    console.log("ISSUE BODY:", issue_body)
  
    return (
      <div className="ui container" >
        <h1 className="ui center aligned header">Issue</h1>
        <div className="ui card fluid">
          <div className="content">
            <div className="header">
              {title}
            <Link to={`/users/${user.id}`}>
              <img src={imgUrl} alt={user.first_name} className="ui mini right floated image" />
            </Link>
            </div>
          </div>
          <div className="content">
            <div className="description">
              {issue_body}
            </div>
            <Link to={`/users/${user.id}`}>
              <p className="ui right aligned">- {user.first_name}</p>
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
              <button type="submit" className="ui icon secondary left labeled button">
                <i aria-hidden="true" className="edit icon"></i>
                Leave comment
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