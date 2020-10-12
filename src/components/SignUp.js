import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button, Segment, Dropdown, Label, Header } from 'semantic-ui-react'
import { avatarOptions } from '../helpers/avatar';
import useFormFields from '../hooks/useFormFields';
import '../resources/SignUp.css';
import { ADD_USER, SET_KEY_HOLDER } from '../store/type';

const SignUp = props => {

  const skills = useSelector(state => state.skill.skills)
  const dispatch = useDispatch()
  const [ avatar, setAvatar ] = useState(null)
  const [ age, setAge ] = useState(null)
  const [ topSkills, setTopSkills ] = useState([])
  const [ skillSelection, setSkillSelection ] = useState([])
  const [ avatarSelection, setAvatarSelection ] = useState([])
  const [ alertHeader, setAlertHeader ] = useState("")
  const [ alertStatus, setAlertStatus ] = useState(false)
  const [ message, setMessage ] = useState([])
  const [ fields, handleFieldChange ] = useFormFields({
    email: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    password: ""
  })

  // fetch skills for dropdown
  useEffect(() => {
    setSkillSelection(skills)
    setAvatarSelection(avatarOptions())
  }, [skills])

  // set age range for dropdown 
  const ageOptions = () => {
    const options = []
    for (let start = 18; start < 85; start++) {
      options.push({ key: start, text: start, value: start })
    }
    return options
  }

  // set age and avatar input
  const handleInputAge = (event) => setAge(event.target.textContent)
  const handleInputAvatar = (event) => setAvatar(event.target.textContent)

  const handleInputSkills = (event) => {
    const newSkill = event.target.textContent
    if (topSkills.length < 5 && newSkill !== "") {  
      setTopSkills([...topSkills, newSkill])
    } else {
      const removeSkill = topSkills.pop()
      const keepSkills = topSkills.filter(skill => skill !== removeSkill)
      setTopSkills([...keepSkills])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newUser = {
      email: fields.email,
      first_name: fields.firstName,
      last_name: fields.lastName,
      password: fields.password,
      job_title: fields.jobTitle,
      topSkills: topSkills,
      age: age,
      avatar: avatar
    }

    fetch("http://localhost:3000/users", {
      method: "POST",  
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(r => r.json())
    .then(data => {
      if (data.errorStatus) {
        handleMessages(data)
      } else {
        const { user, token } = data
        dispatch({ type: ADD_USER, payload: user })
        dispatch({ type: SET_KEY_HOLDER, payload: user })
        localStorage.token = token
        props.history.push('/issues')
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
    <Container className="SignUp-Container">
      <Segment raised className="SignUp-Segment">
        <Form onSubmit={handleSubmit}>
          <Header as='h1' textAlign="center" className="SignUp-Header">Create Account</Header>
          <Form.Group>
            <Form.Input label='First Name' placeholder='First Name' width={8} name="firstName" onChange={handleFieldChange} />
            <Form.Input label='Last Name' placeholder='Last Name' width={8} name="lastName" onChange={handleFieldChange} />
          </Form.Group>
          <Form.Group>
            <Form.Input label='Job Title' placeholder='Job Title' width={15} name="jobTitle" onChange={handleFieldChange} />
            <Form.Input label='Age' placeholder='Age' width={4} name="age" >
              <Dropdown
                  compact
                  selection
                  options={ageOptions()}
                  onChange={handleInputAge}
                />
            </Form.Input>
          </Form.Group>
          <Form.Group>
            <Form.Input label='Choose Your Top 5 Skills' placeholder='Skills' width={16} name="topSkills" >
            <Dropdown 
              name="topSkills"
              placeholder='Choose your top 5 skills' 
              className={`ui ${topSkills.length === 5 ? "disabled" : ""}`}
              fluid multiple selection options={skillSelection} 
              closeOnChange
              onChange={handleInputSkills} 
            />
            </Form.Input>
          </Form.Group>
          { 
            topSkills.length === 5 &&
            <Label pointing prompt color="green">
              All set! If you change your mind you can always add or remove it later. 
            </Label>
          }
          <Form.Group>
            <Form.Input label='Avatar' placeholder='Avatar' width={16} >
              <Dropdown
                name="avatar"
                placeholder='Choose avatar'
                openOnFocus
                selection
                options={avatarSelection}
                onChange={handleInputAvatar}
                value={avatar}
              />
            </Form.Input>
          </Form.Group>
          <Form.Group>
            <Form.Input label='Email' placeholder='Email' width={16} name="email" onChange={handleFieldChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Input type="password" label='Password' placeholder='Password' width={16} name="password" onChange={handleFieldChange}/>
          </Form.Group>
          <Button type='submit' color="green">Create</Button>
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
    </Container>
  );
}

export default withRouter(SignUp);

