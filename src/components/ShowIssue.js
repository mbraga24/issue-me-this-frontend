import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, Card, Image, Header, Divider, Form, TextArea } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import Comment from './Comment';
import useFormFields from '../hooks/useFormFields';
import '../resources/ShowIssue.css';
import { UPDATE_ISSUE, ADD_COMMENT, DELETE_ISSUE } from '../store/type';
import CreateHighlight from '../helpers/CreateHighlight';

const ShowIssue = props => {

  const instructionPost = "Leave your answer here to help others.\nWhen you post a code snippet please add the special characters ``` before and after your code snippet.\nThis way the code can be displayed on the proper format of the language of your choice:\n```\n const sample = () => {\n    console.log('Issue me this?')\n }\n\n ``` \nThank you for helping!"
  const dispatch = useDispatch()
  const issueId = parseInt(props.match.params.id)
  const issues = useSelector(state => state.issue.issues)
  const currentUser = useSelector(state => state.user.keyHolder)
  const comments = useSelector(state => state.comment.comments)
  const currentIssue = issues.find(issue => issue.id === issueId)
  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])
  const [ fields, handleFieldChange ] = useFormFields({
    commentArea: "",
    syntax: ""
  })

  const deleteIssue = () => {
    fetch(`http://localhost:3000/issues/${currentIssue.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(issue => {
      dispatch({ type: DELETE_ISSUE, payload: issue })
      props.history.push('/issues')
    })
  }

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

  // return currentIssue.comments.map(comment => (
  const renderComments = () => {    
    return issueComments().map(comment => (
      <Grid.Row>
        <Grid.Column width={10}>
            <Comment 
              key={comment.id} 
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

  return (
    currentIssue ?
      <Container id="ShowIssue">
        <Header as='h1' textAlign="center" className="ShowIssue-Header">Issue</Header>
        <Grid columns="2" divided id="Issue">
          <Grid.Row>
            <Grid.Column className="ShowIssue-Wrap" width={12}>
                <Card fluid raised>
                  <Card.Content className="ShowIssue-Content">
                    <Link to={`/users/${currentIssue.user.id}`}>
                      <Image
                        floated='right'
                        size='big'
                        avatar
                        alt={`${currentIssue.user.first_name} ${currentIssue.user.last_name}`}
                        src={`https://semantic-ui.com/images/avatar/small/${currentIssue.user.avatar}.jpg`}
                      />
                    </Link>
                    <Card.Header>
                      {currentIssue.title}
                    </Card.Header>
                    <Divider clearing />
                    <Card.Description className="ShowIssue-Issue-Body">
                      {
                        <CreateHighlight dataString={currentIssue.issue_body} syntax={currentIssue.syntax} />
                      }
                    </Card.Description>
                  </Card.Content>
                  {
                    currentUser && currentUser.id === currentIssue.user.id &&
                      <Card.Content extra>
                      <div className='ui two buttons'>
                        <Button as={Link} to={'/home'} basic color='green'>
                          Edit
                        </Button>
                        <Button basic color='red' onClick={deleteIssue}>
                          Delete
                        </Button>
                      </div>
                    </Card.Content>
                  }
                </Card>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column className="ShowIssue-Wrap" width={12}>
            { 
              currentUser ? 
              <Form onSubmit={postComment}>
                <Form.Field
                  name="commentArea"
                  style={{height: "200px"}}
                  control={TextArea}
                  label='Your Answer'
                  placeholder={instructionPost}
                  onChange={handleFieldChange}
                />
                <Form.Group>
                  <Form.Field control={Button}>Post Answer</Form.Field>
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
          <Grid.Row>
            {/* smooth transition  */}
          {/* style={{transition: "0.3s ease-in-out", transform: "translateY(50%)"}} */}
            <Grid.Column className="ShowIssue-Wrap" width={12}>
              <Header as='h1' textAlign="center" className="ShowIssue-Comment-Header">Answers</Header>
              {renderComments()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container> : null
  );
}

export default withRouter(ShowIssue);
