import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Button, Segment, Dropdown, Header } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import useFormFields from '../hooks/useFormFields';
import Loading from './Loading';
import { ADD_USER, SET_KEY_HOLDER } from '../store/type';
import '../resources/SignUp.css';

const SignUp = props => {

  const skills = useSelector(state => state.skill.skills)
  const dispatch = useDispatch()
  const [ dateInput, setDateInput ] = useState("")
  const [ topSkills, setTopSkills ] = useState([])
  const [ skillSelection, setSkillSelection ] = useState([])
  const [ btnLoadingStatus, setBtnLoadingStatus ] = useState(false)
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
    setBtnLoadingStatus(true)

    const newUser = {
      email: fields.email,
      first_name: fields.firstName,
      last_name: fields.lastName,
      job_title: fields.jobTitle,
      top_skills: [...topSkills],
      birthday: dateInput,
      password: fields.password
    }

    fetch("http://localhost:3000/api/v1/users", {
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
        setBtnLoadingStatus(false)
      } else {
        const { user, token } = data
        dispatch({ type: ADD_USER, payload: user })
        dispatch({ type: SET_KEY_HOLDER, payload: user })
        localStorage.token = token
        props.history.push('/issues')
        setBtnLoadingStatus(false)
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

  return (
    <div id="SignUp-Container">
      {
      skills ?
      <Segment raised className="SignUp-Segment">
        <Form onSubmit={createAccount}>
          <Header as='h1' textAlign="center" className="SignUp-Header">Create Account</Header>
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
              width={8} 
              name="jobTitle" 
              label='Job Title' 
              placeholder='Job Title' 
              onChange={handleFieldChange} 
              defaultValue={fields.jobTitle} 
            />
            <DateInput
              width={8} 
              name="date"
              label="Date of Birth"
              dateFormat="MM-DD-YYYY"
              placeholder="mm/dd/yyyy"
              iconPosition="left"
              animation={false}
              value={dateInput}
              onChange={(e, {name, value}) => handleDateChange(name, value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input 
              width={8} 
              name="email" 
              label='Email' 
              placeholder='Email' 
              onChange={handleFieldChange}
              defaultValue={fields.email} 
            />
            <Form.Input 
              width={8} 
              type="password" 
              label='Password' 
              placeholder='Password' 
              name="password" 
              onChange={handleFieldChange}/>
          </Form.Group>
          <Form.Group>
            <Form.Input
              width={12} 
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

          <Button type='submit' color="blue" className={`${btnLoadingStatus && "loading"} Submit-Btn-Size`}>
            {btnLoadingStatus ? "Loading" : "Create Account"}
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
      </Segment> : <Loading loadingClass={true} /> 
      }
    </div>
  );
}

export default withRouter(SignUp);

