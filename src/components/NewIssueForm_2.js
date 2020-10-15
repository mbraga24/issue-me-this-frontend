import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFormFields from '../hooks/useFormFields';
import { ADD_ISSUE } from '../store/type';

const NewIssueForm = props => {

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.keyHolder)
  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])
  const [ fields, handleFieldChange ] = useFormFields({
    title: "",
    issueBody: ""
  })

  const addIssue = (event) => {
    event.preventDefault()
    
    const newIssue = {
      title: fields.title,
      issue_body: fields.issueBody
    }

    fetch("http://localhost:3000/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({issue: newIssue, id: currentUser.id})
    })
      .then(r => r.json())
      .then(issue => {
        if (issue.errorStatus) {
          console.log("NEW ISSUE ERROR -->", issue)
          handleMessages(issue)
        } else {
          dispatch({ type: ADD_ISSUE, payload: issue })
          props.history.push(`/issues`)
        }
      })
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
    <div className="ui container">
      <h1 className="ui center aligned header">New Issue</h1>
      <form className="ui large form" onSubmit={addIssue}>
        <div className="equal width fields">
          <div className="field">
            <label>Title</label>
            <input
              name="title" placeholder="Issue title"
              onChange={handleFieldChange}
              value={fields.title}
            />
          </div>
        </div>
        <div className="five field">
          <label>Issue</label>
          <textarea
            placeholder="Share your issue and let others in our community help you find a solution"
            name="issueBody"
            rows="10"
            onChange={handleFieldChange}
            value={fields.issueBody}
          />
        </div>
        <button type="submit" className="ui button">Post Issue</button>
        <div className="ui hidden divider"></div>
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
    </div>
  );
}

export default NewIssueForm;