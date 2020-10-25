import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Form, Header } from 'semantic-ui-react'
import useFormFields from '../hooks/useFormFields';
import { ADD_ISSUE, UPDATE_USER } from '../store/type';
import '../resources/NewIssueForm.css';

const NewIssueForm = props => {

  const dispatch = useDispatch()
  const instructionTitle = "Be very descriptive with the title of your question."
  const instructionPost = "Share your issue with others here.\nWhen you post a code snippet please add the special characters ``` before and after your code snippet.\nThis way the code can be displayed on the proper format of the language of your choice:\n```\n const sample = () => {\n    console.log('Issue me this?')\n }\n\n ``` \nThank you for sharing!"
  const currentUser = useSelector(state => state.user.keyHolder)
  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])
  const [ fields, handleFieldChange ] = useFormFields({
    title: "",
    issueArea: "",
    syntax: "" 
  })

  const addIssue = (event) => {
    event.preventDefault()
    
    const newIssue = {
      title: fields.title,
      issue_body: fields.issueArea,
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
    <div id="NewIssue-Container">
      <Header as='h1' textAlign="center" className="NewIssue-Header">Tell others your issue</Header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={12} className="NewIssue-Grid-Wrapper">
            <Form onSubmit={addIssue}>
              <Form.Group widths='equal'>
                <Form.Input fluid name="title" placeholder={instructionTitle} onChange={handleFieldChange}/>
              </Form.Group>
              <Form.TextArea 
                name="issueArea" 
                style={{height: "250px"}}
                onChange={handleFieldChange}
                placeholder={instructionPost} />
              <Form.Button>Post Issue</Form.Button>
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

export default NewIssueForm;