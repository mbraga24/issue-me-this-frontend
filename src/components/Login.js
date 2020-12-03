import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import useFormFields from '../hooks/useFormFields';
import { Form, Button, Segment, Header } from 'semantic-ui-react'
import { SET_KEY_HOLDER } from '../store/type';
import '../resources/Login.css';

const Login = props => {

  const dispatch = useDispatch()
  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ btnLoadingStatus, setBtnLoadingStatus ] = useState(false)
  const [ message, setMessage ] = useState([])
  const [ fields, handleFieldChange ] = useFormFields({
    email: "",
    password: ""
  })

  const handleSubmit = event => {
    event.preventDefault()
    setBtnLoadingStatus(true)

    const loginUser = {
      email: fields.email.toLowerCase(),
      password: fields.password
    }

    // make a fetch request to request to login the user - the fetch will be to the custom route "/login"
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginUser)
    })
    .then(r => r.json())
    .then(data => {
      if (data.errorStatus) {
        handleMessages(data)
        setBtnLoadingStatus(false)
      } else {
        const { user, token } = data
        dispatch({ type: SET_KEY_HOLDER, payload: user })
        localStorage.token = token
        props.history.push('/issues')
        setBtnLoadingStatus(false)
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
    <div id="LogIn-Container">
      <Segment raised className="LogIn-Segment">
        <Form onSubmit={handleSubmit}>
          <Header as='h1' textAlign="center" className="LogIn-Header">Log In</Header>
          <Form.Group>
            <Form.Input label='Email' placeholder='Email' width={16} name="email" onChange={handleFieldChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Input type="password" label='Password' placeholder='Password' width={16} name="password" onChange={handleFieldChange}/>
          </Form.Group>
          <Button type='submit' color="green" className={`${btnLoadingStatus && "loading"} Submit-Btn-Size`}>
            {btnLoadingStatus ? "Loading" : "Log In"}
          </Button>
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
      </Segment>
    </div>
  );
}

export default withRouter(Login);
