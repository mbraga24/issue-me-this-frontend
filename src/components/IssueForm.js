import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Form, Header } from 'semantic-ui-react'
import useFormFields from '../hooks/useFormFields';
import { ADD_ISSUE, UPDATE_USER, UPDATE_TITLE, UPDATE_BODY } from '../store/type';
import '../resources/IssueForm.css';
import { withRouter } from 'react-router-dom';

const IssueForm = props => {

  const dispatch = useDispatch()
  const instructionTitle = "Be very descriptive with the title of your question."
  const instructionPost = "Share your issue with others here.\nWhen you post a code snippet please add the special characters ``` before and after your code snippet.\nThis way the code can be displayed on the proper format of the language of your choice:\n```\n const sample = () => {\n    console.log('Issue me this?')\n }\n\n ``` \nThank you for sharing!"
  const currentUser = useSelector(state => state.user.keyHolder)
  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])

  const [ fields, handleFieldChange ] = useFormFields({
    title: "",
    issueBody: ""
    // syntax: ""
  })

  const updateFields = () => {
    if (fields.title === "") {
      fields.title = props.issueData.title
    } 
    if (fields.issueBody === "") {
      fields.issueBody = props.issueData.issue_body
    } 
    // if (fields.syntax === "") {
    //   fields.syntax = props.issueData.syntax
    // } 

    dispatch({ type: UPDATE_TITLE, payload: fields.title })
    dispatch({ type: UPDATE_BODY, payload: fields.issueBody })
    // dispatch({ type: UPDATE_SYNTAX, payload: fields.syntax })
  }

  if (props.isUpdateForm) { updateFields() } 

  const addIssue = (event) => {
    event.preventDefault()
    
    const newIssue = {
      title: fields.title,
      issue_body: fields.issueBody,
      syntax: 'javascript'
    }

    fetch("http://localhost:3000/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({issue: newIssue, id: currentUser.id})
    })
      .then(r => r.json())
      .then(data => {
        if (data.errorStatus) {
          handleMessages(data)
        } else {
          dispatch({ type: ADD_ISSUE, payload: data.issue })
          dispatch({ type: UPDATE_USER, payload: data.user })
          props.history.push(`/issues`)
        }
      })
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
    <div id="IssueForm-Container">
      { props.displayContent && <Header as='h1' textAlign="center" color="grey" className="IssueForm-Header">What's your issue?</Header> }
      <Grid>
        <Grid.Row>
          <Grid.Column width={12} className="IssueForm-Grid-Wrapper">
            <Form onSubmit={props.displayContent ? addIssue : null}>
              <Form.Group widths='equal'>
                <Form.Input fluid name="title" defaultValue={props.issueData ? props.issueData.title : undefined} placeholder={instructionTitle} onChange={handleFieldChange}/>
              </Form.Group>
              <Form.TextArea 
                name="issueBody" 
                style={{height: "250px"}}
                onChange={handleFieldChange}
                defaultValue={props.issueData ? props.issueData.issue_body : undefined}
                placeholder={instructionPost} />
              { 
                props.displayContent &&
                <Form.Button positive>Post Issue</Form.Button>
              }
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default withRouter(IssueForm);