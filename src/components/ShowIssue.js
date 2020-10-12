import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Comment from './Comment';
import useFormFields from '../hooks/useFormFields';
import '../resources/ShowIssue.css';
import { UPDATE_ISSUE, ADD_COMMENT } from '../store/type';

const ShowIssue = props => {

  const dispatch = useDispatch()
  const issueId = props.match.params.id
  const issues = useSelector(state => state.issue.issues)
  const currentUser = useSelector(state => state.user.keyHolder)
  const currentIssue = issues.find(issue => issue.id === parseInt(issueId))
  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])

  // const [ issue, setIssue ] = useState(null)
  const [ fields, handleFieldChange ] = useFormFields({
    title: "",
    comment: ""
  })

  const postComment = event => {
    event.preventDefault()
    
    const newComent = {
      title: fields.title,
      comment_body: fields.comment
    }

    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment: newComent, 
        user_id: currentUser.id, 
        issue_id: currentIssue.id
      })
    })
    .then(r => r.json())
    .then(data => {
      // console.log("POST COMMENT --->", data)
      if (data.errorStatus) {
        console.log("POST COMMENT ERROR -->", data)
        handleMessages(data)
      } else {
        console.log("POST COMMENT -->", data)
        dispatch({ type: ADD_COMMENT, payload: data.comment })
        dispatch({ type: UPDATE_ISSUE, payload: data.issue })
      }
    })
    // reset title and comment values on form to an empty string
    event.target.title.value = ""
    event.target.comment.value = ""
  }

  const renderComments = () => {    
    return currentIssue.comments.map(comment => (
      <Comment 
        key={comment.id} 
        comment={comment} />
    ))
  }

  const handleMessages = data => {
    console.log("HANDLE MESSAGES DATA -->", data)
    setAlertHeader(data.header)
    setAlertStatus(true)
    handleDismissCountDown()
    setMessage(data.error)
  }

  const renderAlertMessage = () => {
    return message.map(message => <li className="content">{message}</li> )
  }

  const handleDismissOnClick = () => {
    setAlertStatus(false)
  }

  const handleDismissCountDown = () => {
    setTimeout(() => {
      setAlertStatus(false)
    }, 4000)
  }
    
  return (
    currentIssue ?
      <div className="ui container" >
        <h1 className="ui center aligned header">Issue</h1>
        <div className="ui card fluid">
          <div className="content">
            <div className="header">
              {currentIssue.title}
            <Link to={`/users/${currentIssue.user.id}`}>
              <img src={`https://semantic-ui.com/images/avatar/small/${currentIssue.user.avatar}.jpg`} alt={currentIssue.user.first_name} className="ui mini right floated image" />
            </Link>
            </div>
          </div>
          <div className="content">
            <div className="description">
              {currentIssue.issue_body}
            </div>
            <Link to={`/users/${currentIssue.user.id}`}>
              <p className="ui right aligned">- {currentIssue.user.first_name}</p>
            </Link>
          </div>
        </div>

        <div className="ui comments">
          <h3 className="ui dividing header">Comments</h3>
          {renderComments()}
          { 
            currentUser ? 
            <form className="ui reply form" onSubmit={postComment}>
              <div className="field">
                <input placeholder="Title" name="title" onChange={handleFieldChange}/>
              </div>
              <div className="field">
                <textarea placeholder="Text" name="comment" rows="3" onChange={handleFieldChange}></textarea>
              </div>
              <button type="submit" className="ui icon secondary left labeled button">
                <i aria-hidden="true" className="edit icon"></i>
                Post Comment
              </button>
              {
                (alertStatus && !!message) && 
                  <div className="ui negative message">
                    <i className="close icon" onClick={handleDismissOnClick}></i>
                    <div className="header">
                      {alertHeader}
                    </div>
                    <ul className="list">
                      {message.length !== 0 ? renderAlertMessage() : null}
                    </ul>
                  </div>
              }
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
      </div> : null
  );
}

export default withRouter(ShowIssue);