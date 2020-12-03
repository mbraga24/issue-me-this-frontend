import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, Header, Form, TextArea } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import Comment from './Comment';
import Issue from './Issue';
import useFormFields from '../hooks/useFormFields';
import Loading from './Loading';
import '../resources/ShowIssue.css';
import { UPDATE_ISSUE, ADD_COMMENT } from '../store/type';

const ShowIssue = props => {

  const instructionPost = "Leave your answer here to help others.\nWhen you post a code snippet please add the special characters ``` before and after your code snippet.\nThis way the code can be displayed on the proper format of the language of your choice:\n```\n const sample = () => {\n    console.log('Issue me this?')\n }\n\n ``` \nThank you for helping!"
  const dispatch = useDispatch()
  const issueId = parseInt(props.match.params.id)
  const issues = useSelector(state => state.issue.issues)
  const currentUser = useSelector(state => state.user.keyHolder)
  const comments = useSelector(state => state.comment.comments)
  const currentIssue = issues && issues.find(issue => issue.id === issueId)
  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])
  const [ fields, handleFieldChange ] = useFormFields({
    commentArea: "",
    syntax: ""
  })

  const postComment = event => {
    event.preventDefault()
    
    const newComent = {
      comment_body: fields.commentArea,
      syntax: "javascript"
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
      if (data.errorStatus) {
        handleMessages(data)
      } else {
        dispatch({ type: ADD_COMMENT, payload: data.comment })
        dispatch({ type: UPDATE_ISSUE, payload: data.issue })
      }
    })
    // reset title and comment values on form to an empty string
    event.target.commentArea.value = ""
  }

  const issueComments = () => {
      return comments.filter(comment => comment.issue_id === currentIssue.id)
  }

  const renderComments = () => {    
    return issueComments().map(comment => (
      <Grid.Row key={comment.id} >
        <Grid.Column width={10}>
            <Comment 
              comment={comment} />
        </Grid.Column>
      </Grid.Row>
    ))
  }

  const handleMessages = data => {
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

  // console.log(comments.le)

  return (
    <Container id="ShowIssue">
      {
        currentIssue ?
        <React.Fragment>
          <Header as='h1' textAlign="center" className="ShowIssue-Header">Issue</Header>
          <Grid columns="2" divided id="Issue">
            <Issue issue={currentIssue} displayBody={true}/>
            <Grid.Row>
              <Grid.Column className="ShowIssue-Wrap" width={12}>
              { 
                currentUser ? 
                <Form onSubmit={postComment}>
                  <Form.Field
                    name="commentArea"
                    className="Form-Field-Answer"
                    control={TextArea}
                    label='Your Answer'
                    placeholder={instructionPost}
                    onChange={handleFieldChange}
                  />
                  <Form.Group>
                    <Form.Field control={Button} positive>Post Answer</Form.Field>
                  </Form.Group>
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
                </Form>
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
              </Grid.Column>
            </Grid.Row>

            {
              issueComments().length !== 0 && 
              <Grid.Row>
                <Grid.Column className="ShowIssue-Wrap" width={12}>
                  <Header as='h1' textAlign="center" className="ShowIssue-Comment-Header">Answers</Header>
                  {renderComments()}
                </Grid.Column>
              </Grid.Row>
            }
          </Grid>
        </React.Fragment> : <Loading loadingClass={true} /> 
        }      
        </Container> 
  );
}

export default ShowIssue;
