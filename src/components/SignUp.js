import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, Segment, Dropdown, Label, Header, Icon, Image } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import useFormFields from '../hooks/useFormFields';
import Loading from './Loading';
import { ADD_USER, SET_KEY_HOLDER } from '../store/type';
import '../resources/Signup.css';

const Signup = props => {

  const skills = useSelector(state => state.skill.skills)
  const dispatch = useDispatch()
  const [ dateInput, setDateInput ] = useState("")
  const [ topSkills, setTopSkills ] = useState([])
  const [ skillSelection, setSkillSelection ] = useState([])
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

  useEffect(() => {
    setSkillSelection(skills)
  }, [skills])

  const handleSkillInput = (event, { value }) => {
    console.log("VALUE ", value)
    const newSkill = event.target.textContent
    if (topSkills.length < 5 && newSkill !== "") {  
      setTopSkills([...topSkills, newSkill])
    } else {
      const removeSkill = topSkills.pop()
      const keepSkills = topSkills.filter(skill => skill !== removeSkill)
      setTopSkills([...keepSkills])
    }
  }

  const createAccount = (event) => {
    event.preventDefault()

    const newUser = {
      email: fields.email,
      first_name: fields.firstName,
      last_name: fields.lastName,
      job_title: fields.jobTitle,
      top_skills: [...topSkills],
      birthday: dateInput,
      // picture: pictureFile,
      password: fields.password
    }

    console.log("newUser -->", newUser)

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

  const handleDateChange = (name, value) => {
    setDateInput(value.split("-").join("/"))
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

  console.log("topSkills", topSkills)

  return (
    <div id="Signup-Container">
      {
      skills ?
      <Segment raised className="Signup-Segment">
        <Form onSubmit={createAccount}>
          <Header as='h1' textAlign="center" className="Signup-Header">Create Account</Header>
          <Form.Group>
            <Form.Input 
              width={8} 
              name="firstName" 
              label='First Name' 
              placeholder="First Name" 
              onChange={handleFieldChange} 
              defaultValue={fields.firstName} 
            />
            <Form.Input 
              width={8} 
              name="lastName" 
              label='Last Name' 
              placeholder='Last Name' 
              onChange={handleFieldChange} 
              defaultValue={fields.lastName} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Input 
              width={10} 
              name="jobTitle" 
              label='Job Title' 
              placeholder='Job Title' 
              onChange={handleFieldChange} 
              defaultValue={fields.jobTitle} 
            />
            <DateInput
              width={10} 
              name="date"
              label="Date of Birth"
              dateFormat="MM-DD-YYYY"
              placeholder="mm/dd/yyyy"
              value={dateInput}
              iconPosition="left"
              animation={false}
              defaultValue={dateInput} 
              onChange={(e, {name, value}) => handleDateChange(name, value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input 
              width={16} 
              name="topSkills" 
              label='Choose Your Top 5 Skills' 
              placeholder='Skills' 
            >
            <Dropdown 
              name="topSkills"
              placeholder='Choose your top 5 skills' 
              className={`ui ${topSkills.length === 5 ? "disabled" : ""}`}
              fluid 
              multiple 
              selection 
              closeOnChange
              options={skillSelection} 
              onChange={(event, {value}) => handleSkillInput(event, value)} 
              defaultValue={topSkills}
            />
            </Form.Input>
          </Form.Group>
          { 
            topSkills.length === 5 &&
            <Label pointing prompt color="green">
              All set! If you change your mind you can always update your skills later. 
            </Label> 
          }
          <Form.Group>
            <Form.Field className="Signup-Profile-Picture-Item">
              <label>Profile Picture</label>
              <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size='small'/>
            </Form.Field>
          </Form.Group>
          {/* <Form.Group className="Signup-Profile-Picture-Wrapper"> */}
          <Form.Group>
            <Form.Field className="Signup-Profile-Picture-Item">
              <input
                type="file"
                id="file"
                name="file"
                hidden
                // onChange={fileChange}
              />
              <Button type="button" as="label" htmlFor="file" style={{color: "white;"}}>
                <Icon name="desktop" />
                Choose a profile picture
              </Button>
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Input 
              width={16} 
              name="email" 
              label='Email' 
              placeholder='Email' 
              onChange={handleFieldChange}
              defaultValue={fields.email} 
            />
          </Form.Group>
          <Form.Group>
            <Form.Input type="password" label='Password' placeholder='Password' width={16} name="password" onChange={handleFieldChange}/>
          </Form.Group>
          <Button type='submit' color="blue">Create Account</Button>
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
      </Segment> : <Loading loadingClass={true} /> 
      }
    </div>
  );
}

export default withRouter(Signup);

