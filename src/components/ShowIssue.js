import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Grid, Button, Card, Image, Header, Divider, Form, TextArea, Transition } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';
import Comment from './Comment';
import useFormFields from '../hooks/useFormFields';
import { Highlight } from 'react-fast-highlight';
import '../resources/ShowIssue.css';
import { UPDATE_ISSUE, ADD_COMMENT, DELETE_ISSUE } from '../store/type';

const ShowIssue = props => {

  const dispatch = useDispatch()
  const issueId = parseInt(props.match.params.id)
  const issues = useSelector(state => state.issue.issues)
  const currentUser = useSelector(state => state.user.keyHolder)
  const comments = useSelector(state => state.comment.comments)
  const currentIssue = issues.find(issue => issue.id === issueId)
  const [ alertHeader, setAlertHeader ] = useState("")
  const [ duration ] = useState(1000)
  const [ formVisible, setFormVisible ] = useState(false)
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])

  // const [ issue, setIssue ] = useState(null)
  const [ fields, handleFieldChange ] = useFormFields({
    commentArea: "",
    codeArea: ""
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
      code_body: fields.codeArea,
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

  const handleVisibility = () => {
    setFormVisible(!formVisible)
  }

  console.log("ShowIssue -->", currentIssue && currentIssue.code_body)

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
                      {currentIssue.issue_body}
                      <Highlight languages={[`${currentIssue.syntax ? currentIssue.syntax : "plaintext"}`]}>
                        {currentIssue.code_body}
                      </Highlight>
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
                  control={TextArea}
                  label='Your Answer'
                  placeholder='The more details the better it is for others to understand.'
                  onChange={handleFieldChange}
                />
                <Transition.Group animation="fade down" duration={duration}>
                  {formVisible && (
                    <Form.Field
                      name="codeArea"
                      control={TextArea}
                      label='Code Snippet'
                      placeholder='Write or paste your code.'
                      onChange={handleFieldChange}
                    />
                  )}
                </Transition.Group>
                <Form.Group>
                  <Form.Field control={Button}>Post Answer</Form.Field>
                  <Button type="button" content={formVisible ? 'Hide Snippet' : 'Add Snippet'} onClick={handleVisibility} />
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
